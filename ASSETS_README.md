# Areatec Site — Assets Guide

## Static Assets (images & video)

A pasta `static-assets/` contém todos os arquivos de mídia utilizados pelo site.

### Arquivos referenciados via `/manus-storage/` no código

Esses caminhos funcionam automaticamente no Manus. Para hospedagem externa (GitHub Pages, Vercel, Netlify, etc.), você precisa:

1. Hospedar os arquivos em um CDN ou servidor próprio
2. Substituir os caminhos `/manus-storage/...` no código-fonte pelas suas URLs de CDN

| Arquivo em `static-assets/`    | Componente                | Caminho no código                                       |
|---------------------------------|---------------------------|---------------------------------------------------------|
| `video_areatec_final.mp4`       | HeroSection.tsx           | `/manus-storage/video_areatec_final_ad696d7e.mp4`       |
| `keyframe_inicial.png`          | HeroSection.tsx (poster)  | `/manus-storage/keyframe_inicial_3318a362.png`          |
| `keyframe_inicial.png`          | VeiculoOCRBanner.tsx      | `/manus-storage/keyframe_inicial_3318a362.png`          |

### Outras imagens externas (já no CDN, nenhuma ação necessária)
- Câmera OCR na HardwareSection: hospedada no CloudFront da Areatec

## Build & Execução

```bash
pnpm install
pnpm dev        # servidor de desenvolvimento
pnpm build      # build de produção → dist/
```

## Estrutura do Projeto

```
client/
  public/       ← favicon.svg e arquivos de configuração
  src/
    pages/      ← páginas (Home, NotFound)
    components/ ← componentes reutilizáveis e shadcn/ui
    hooks/      ← hooks customizados
    lib/        ← utilitários
    App.tsx     ← rotas e layout
    index.css   ← variáveis CSS e tema global
static-assets/  ← imagens e vídeo do site
```
