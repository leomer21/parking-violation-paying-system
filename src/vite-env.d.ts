/// <reference types="vite/client" />

interface ImportMeta {
  env: {
    VITE_API_PUBLIC_URL: string;
    VITE_API_BACKEND_URL: string;
    VITE_API_STRIPE_TEST: string;
    VITE_API_STRIPE_LIVE: string;
  };
}
