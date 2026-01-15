/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY?: string;
  readonly PROD: boolean;
  readonly DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
