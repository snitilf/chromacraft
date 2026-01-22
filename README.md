# ChromaCraft

a color palette previewer for designers and developers who are tired of guessing how their colors will look in real interfaces

## why I built this

i spend a lot of time creating marketing posts, exploring branding colors for new project ideas, and building side projects. the problem was always the same: i would pick colors that looked good in isolation, but had no idea how they would work together in an actual ui until i built something with them

existing color tools would show me swatches or simple gradients, but nothing that felt like a real website or app. so i made chromacraft to solve that for myself

## what it does

- generates harmonious 5-color palettes using ai based on a text description
- shows your palette applied to real ui components in real-time: a hero section, a mobile app mockup, buttons, cards, and more
- exports your palette in multiple formats: css variables, tailwind config, and scss variables

## research-backed color optimization

chromacraft doesn't just generate pretty colors, it applies behavioral psychology and conversion science to create palettes that actually perform. the ai is trained on principles from academic research and industry a/b testing data

### key principles

**the 50ms rule**: users form permanent aesthetic judgments in 50 milliseconds (lindgaard 2006). chromacraft ensures every palette passes the "visceral gate" with proper contrast ratios and visual harmony before any conscious evaluation begins.

**the isolation effect**: call-to-action buttons convert better when they visually "pop." chromacraft automatically calculates complementary colors (180° opposite on the color wheel) for accent colors, creating maximum saliency. this technique has shown 21% conversion lifts in a/b tests

**the 60-30-10 rule**: borrowed from interior design, this distribution (60% background, 30% secondary, 10% accent) reduces cognitive load and creates clear visual hierarchy. chromacraft enforces this ratio in every generated palette

**category-specific optimization**: different industries have different color expectations. fintech needs blue/navy for trust. luxury brands need desaturated, muted tones. startups need energetic warm accents. chromacraft detects context from your description and applies the right rules automatically

**accessibility-first**: every palette maintains wcag aa contrast ratios (4.5:1 minimum) and uses research-backed alternatives like charcoal (#36454F) over pure black to reduce eye strain

## setup

### prerequisites

- node.js
- an openai api key from [platform.openai.com](https://platform.openai.com)

### running locally

1. clone the repo and install dependencies:
   ```
   npm install
   ```

2. create a `.env` file in the root directory:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
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

when deploying to vercel, add `OPENAI_API_KEY` as an environment variable in your project settings under settings > environment variables. make sure it is enabled for production, preview, and development environments

the api key is kept secure on the server and never exposed to client-side code.

## tech stack

- react with typescript
- vite
- tailwind css
- openai gpt-4o for palette generation