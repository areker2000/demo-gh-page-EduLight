interface ImportMetaEnv {
  readonly VITE_API_BASE: string;
  readonly VITE_API_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
declare module 'swiper/css*';
