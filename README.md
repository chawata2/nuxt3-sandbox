# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## 本番環境(Docker)

```bash
docker build --target prod -t nuxt3-template:latest .
docker run --init --name nuxt3-template -p 80:3000 nuxt3-template:latest
```

`--init`オプションを使用しないと、デフォルトのシグナルハンドラが機能しない。
# nuxt3-sandbox
