/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VAAKUOS_API_URL?: string;
  readonly VITE_VAAKUOS_WRITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** VaakuOS SDK v4, loaded by the snippet in index.html — not a local module. */
interface Window {
  VaakuOS?: {
    version?: string;
    setCart: (cart: Record<string, unknown>) => unknown;
    getCart: () => Record<string, unknown>;
    viewProduct: (product: Record<string, unknown>) => void;
    identify: (traits: Record<string, unknown>) => void;
    checkout: (input?: Record<string, unknown>) => void;
    trackOrder: (order: Record<string, unknown>) => void;
    track: (event: string, props?: Record<string, unknown>) => void;
    flush: () => void;
    reset: () => void;
    getAnonymousId: () => string;
  };
}
