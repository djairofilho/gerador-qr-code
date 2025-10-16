## Gerador de QR Code

Aplicação React (Vite) que gera QR Codes diretamente no navegador usando a biblioteca [`qrcode`](https://www.npmjs.com/package/qrcode). O layout segue um tema dark com tipografia moderna (Inter) e não depende de um backend para funcionar.

### Pré-requisitos

- Node.js 18+
- npm 9+

### Instalação

```powershell
cd geradorQRcode
npm install
```

### Desenvolvimento

```powershell
npm run dev
```

O Vite abrirá em `http://localhost:5173`. A página inicial mapeia o texto digitado para um QR Code renderizado instantaneamente. Se você desejar integrar com uma API externa, ajuste as chamadas em `src/App.tsx` conforme necessário.

### Build de produção

```powershell
npm run build
npm run preview
```

O comando `preview` serve apenas para inspecionar o build localmente.

### Personalização

- A fonte Inter é carregada via Google Fonts em `index.html`.
- As cores principais do tema estão definidas inline em `src/App.tsx`. Adapte-as para o seu palette.
- O QR é gerado pelo helper `buildQr`, também em `src/App.tsx`, onde você pode ajustar `width`, `margin` e `errorCorrectionLevel`.
