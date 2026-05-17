// Custom pre-rendering script using modern Puppeteer
// Generates static HTML for each route with full React content
import puppeteer from "puppeteer";
import { createServer } from "http";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, "dist", "public");
const PORT = 45678;

const ROUTES = [
  "/",
  "/olhovivo-patrol",
  "/olhovivo-parking",
  "/404",
];

// Simple static file server
function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(DIST_DIR, req.url === "/" ? "index.html" : req.url);
      
      // SPA fallback
      if (!existsSync(filePath) && !filePath.includes(".")) {
        filePath = join(DIST_DIR, "index.html");
      }
      
      try {
        const content = readFileSync(filePath);
        const ext = filePath.split(".").pop();
        const mimeTypes = {
          html: "text/html",
          js: "application/javascript",
          css: "text/css",
          png: "image/png",
          jpg: "image/jpeg",
          webp: "image/webp",
          svg: "image/svg+xml",
          webm: "video/webm",
          mp4: "video/mp4",
          woff2: "font/woff2",
        };
        res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end("Not found");
      }
    });
    server.listen(PORT, () => {
      console.log(`Static server running on port ${PORT}`);
      resolve(server);
    });
  });
}

async function prerenderRoute(browser, route) {
  const page = await browser.newPage();
  const url = `http://localhost:${PORT}${route}`;
  
  console.log(`Pre-rendering: ${route}`);
  
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  
  // Wait for React to render
  await page.waitForSelector("#root > *", { timeout: 10000 }).catch(() => {
    console.warn(`  Warning: No content in #root for ${route}`);
  });
  
  // Wait for React to mount and render content
  await new Promise(r => setTimeout(r, 5000));
  
  // Clean up duplicate meta tags from fallback HTML
  // Helmet adds its own tags but the fallback ones from index.html remain
  await page.evaluate(() => {
    const head = document.head;
    
    // Remove duplicate titles (keep only the first one - Helmet's)
    const titles = head.querySelectorAll('title');
    for (let i = 1; i < titles.length; i++) titles[i].remove();
    
    // Remove duplicate meta descriptions (keep Helmet's - last one)
    const descs = head.querySelectorAll('meta[name="description"]');
    if (descs.length > 1) {
      for (let i = 0; i < descs.length - 1; i++) descs[i].remove();
    }
    
    // Remove duplicate canonicals (keep Helmet's - last one)
    const canons = head.querySelectorAll('link[rel="canonical"]');
    if (canons.length > 1) {
      for (let i = 0; i < canons.length - 1; i++) canons[i].remove();
    }
    
    // Remove duplicate OG tags (keep Helmet's - last set)
    const ogTypes = ['og:type', 'og:url', 'og:title', 'og:description', 'og:image', 'og:image:width', 'og:image:height', 'og:locale', 'og:site_name'];
    ogTypes.forEach(prop => {
      const tags = head.querySelectorAll(`meta[property="${prop}"]`);
      if (tags.length > 1) {
        for (let i = 0; i < tags.length - 1; i++) tags[i].remove();
      }
    });
    
    // Remove duplicate twitter tags
    const twTypes = ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'];
    twTypes.forEach(name => {
      const tags = head.querySelectorAll(`meta[name="${name}"]`);
      if (tags.length > 1) {
        for (let i = 0; i < tags.length - 1; i++) tags[i].remove();
      }
    });
    
    // Remove duplicate hreflang links (keep Helmet's - last set)
    const hreflangs = {};
    head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => {
      const lang = link.getAttribute('hreflang');
      if (!hreflangs[lang]) hreflangs[lang] = [];
      hreflangs[lang].push(link);
    });
    Object.values(hreflangs).forEach(links => {
      for (let i = 0; i < links.length - 1; i++) links[i].remove();
    });
  });
  
  // Get the full HTML
  const html = await page.content();
  
  // Determine output path
  let outputPath;
  if (route === "/") {
    outputPath = join(DIST_DIR, "index.html");
  } else if (route === "/404") {
    outputPath = join(DIST_DIR, "404.html");
  } else {
    const dir = join(DIST_DIR, route.slice(1));
    mkdirSync(dir, { recursive: true });
    outputPath = join(dir, "index.html");
  }
  
  writeFileSync(outputPath, html, "utf-8");
  console.log(`  Saved: ${outputPath} (${(html.length / 1024).toFixed(0)}KB)`);
  
  await page.close();
}

async function main() {
  // Save original index.html as 200.html (SPA fallback)
  const originalHtml = readFileSync(join(DIST_DIR, "index.html"), "utf-8");
  writeFileSync(join(DIST_DIR, "200.html"), originalHtml, "utf-8");
  
  const server = await startServer();
  
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });
  
  for (const route of ROUTES) {
    await prerenderRoute(browser, route);
  }
  
  await browser.close();
  server.close();
  
  console.log("\nPre-rendering complete!");
  console.log(`Routes pre-rendered: ${ROUTES.length}`);
}

main().catch((err) => {
  console.error("Pre-rendering failed:", err);
  process.exit(1);
});
