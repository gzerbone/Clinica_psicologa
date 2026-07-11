# Bárbara Badaró — Site Institucional

Site da neuropsicóloga Bárbara Badaró. Feito com React, TypeScript e Vite.

## O que baixar

- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- O npm já vem junto com o Node

## Como rodar

1. Abra o terminal na pasta do projeto

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento (otimiza imagens novas/alteradas e sobe com hot reload):

```bash
npm run dev
```

4. Acesse no navegador: **http://localhost:3000**

## Imagens e build (produção / Netlify)

Coloque originais em `assets/raw/images/{secao}/` (ex.: `assets/raw/images/abordagem/fundo.jpg`).

Um único comando otimiza só o que for novo/alterado e gera o site:

```bash
npm run build
```

- Otimiza imagens novas ou modificadas → WebP em `src/assets/images/` (ou `public/images/` para OG)
- Depois gera a pasta `dist`
- No Netlify, o comando de build é exatamente esse (`netlify.toml`)

Para só otimizar imagens (sem build):

```bash
npm run images:optimize
```

## Outros comandos

```bash
npm run preview  # visualiza a build de produção
```
