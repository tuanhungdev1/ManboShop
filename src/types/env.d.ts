interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_GOOGLE_CLIENT_SECRET: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_FACEBOOK_APP_ID: string;
  readonly VITE_FACEBOOK_APP_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
