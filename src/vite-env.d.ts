/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VAAKUOS_API_URL?: string;
  readonly VITE_VAAKUOS_WRITE_KEY?: string;
  readonly VITE_VAAKUOS_API_KEY?: string;
  readonly VITE_VAAKUOS_SITE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Loaded by public/sdk/vaakuos-cart.js snippet — not a local module. */
interface Window {
  VaakuOS?: {
    version?: string;
    setCart: (cart: Record<string, unknown>) => unknown;
    getCart: () => Record<string, unknown>;
    viewProduct: (product: Record<string, unknown>) => void;
    identify: (traits: Record<string, unknown>) => void;
    checkout: (input?: Record<string, unknown>) => void;
    trackOrder: (order: Record<string, unknown>) => void;
    flush: () => void;
    getAnonymousId: () => string;
    getUser: () => Record<string, unknown>;
  };
}
