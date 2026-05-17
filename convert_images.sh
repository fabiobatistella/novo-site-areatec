#!/bin/bash
# Convert heavy images to WebP format with max 200KB target
cd /home/ubuntu/novo-site-areatec/client/public/assets/

echo "=== Converting images to WebP ==="

# parking_hero_cgi.jpg (5.79 MB) -> webp
echo "Converting parking_hero_cgi.jpg..."
cwebp -q 60 -resize 1920 0 parking_hero_cgi.jpg -o parking_hero_cgi.webp
ls -la parking_hero_cgi.webp

# keyframe_inicial.png (4.36 MB) -> webp
echo "Converting keyframe_inicial.png..."
cwebp -q 60 -resize 1920 0 keyframe_inicial.png -o keyframe_inicial.webp
ls -la keyframe_inicial.webp

# hb20_areatec_rack_final.png (2.2 MB) -> webp
echo "Converting hb20_areatec_rack_final.png..."
cwebp -q 65 -resize 1200 0 hb20_areatec_rack_final.png -o hb20_areatec_rack_final.webp
ls -la hb20_areatec_rack_final.webp

# tablet_ocr_interior.jpg (5.0 MB) -> webp
echo "Converting tablet_ocr_interior.jpg..."
cwebp -q 60 -resize 1200 0 tablet_ocr_interior.jpg -o tablet_ocr_interior.webp
ls -la tablet_ocr_interior.webp

# hero_poster.jpg (121KB) - already small but convert for consistency
echo "Converting hero_poster.jpg..."
cwebp -q 70 hero_poster.jpg -o hero_poster.webp
ls -la hero_poster.webp

# screen_*.jpg files (175-255KB) -> webp
for f in screen_*.jpg; do
  echo "Converting $f..."
  name="${f%.jpg}"
  cwebp -q 70 -resize 800 0 "$f" -o "${name}.webp"
  ls -la "${name}.webp"
done

echo ""
echo "=== Size comparison ==="
echo "Original sizes:"
du -sh *.jpg *.png 2>/dev/null | sort -rh
echo ""
echo "WebP sizes:"
du -sh *.webp 2>/dev/null | sort -rh
