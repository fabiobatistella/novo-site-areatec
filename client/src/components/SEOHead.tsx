// SEOHead — Dynamic meta tags per route using react-helmet-async
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";

const SITE_URL = "https://www.areatec.com.br";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  type?: string;
  image?: string;
  jsonLd?: object | object[];
}

export default function SEOHead({ title, description, path, type = "website", image, jsonLd }: SEOHeadProps) {
  const { lang } = useLanguage();
  const canonical = `${SITE_URL}${path}`;
  const ogImage = image || OG_IMAGE;
  const htmlLang = lang === "pt" ? "pt-BR" : lang;

  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={lang === "pt" ? "pt_BR" : lang === "es" ? "es_ES" : "en_US"} />
      <meta property="og:site_name" content="Areatec" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Hreflang */}
      <link rel="alternate" hrefLang="pt-BR" href={`${SITE_URL}${path}`} />
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}${path}?lang=en`} />
      <link rel="alternate" hrefLang="es" href={`${SITE_URL}${path}?lang=es`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${path}`} />

      {/* JSON-LD */}
      {jsonLdArray.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
}
