# ChromaCraft

a color palette previewer for designers and developers who are tired of guessing how their colors will look in real interfaces.

## why i built this

i spend a lot of time creating marketing posts, exploring branding colors for new project ideas, and building side projects. the problem was always the same: i would pick colors that looked good in isolation, but had no idea how they would work together in an actual ui until i built something with them.

existing color tools would show me swatches or simple gradients, but nothing that felt like a real website or app. so i made chromacraft to solve that for myself.

## what it does

- generates harmonious 5-color palettes using ai based on a text description
- shows your palette applied to real ui components in real-time: a hero section, a mobile app mockup, buttons, cards, and more
- exports your palette in multiple formats: css variables, tailwind config, and scss variables

## setup

### prerequisites

- node.js
- a gemini api key from google ai studio

### running locally

1. clone the repo and install dependencies:
   ```
   npm install
   ```

2. create a `.env` file in the root directory:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. start the dev server with vercel cli (this runs both the frontend and api routes):
   ```
   npm run dev:vercel
   ```
   
   if you don't have vercel cli installed, install it first:
   ```
   npm i -g vercel
   ```

   note: the api key is stored server-side in the api route, so it's never exposed to the browser.

### deploying to vercel

when deploying to vercel, add `GEMINI_API_KEY` (not VITE_API_KEY) as an environment variable in your project settings under settings > environment variables. make sure it is enabled for production, preview, and development environments.

the api key is kept secure on the server and never exposed to client-side code.

## tech stack

- react with typescript
- vite
- tailwind css
- google gemini api for palette generation
