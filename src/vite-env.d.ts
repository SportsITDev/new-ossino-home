/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_WEBSITE_URL: string;
    readonly VITE_WRAPPER_SERVICE_URL: string;
    readonly VITE_LOYALTY_SERVICE_URL: string;
    readonly VITE_CONTENT_SERVICE_URL: string;
    readonly VITE_GAMES_SERVICE_URL: string;
    readonly VITE_BRAND_ID: string;
    readonly VITE_PLATFORM_ID: string;
    readonly VITE_OPERATOR_ID: string;
    readonly VITE_OPERATOR_ID_CapitalCase: string;
    readonly VITE_GOOGLE_CLIENT_ID: string;
    readonly VITE_LOYALTY_AUTH: string;
    readonly VITE_LOYALTY_USERNAME: string;
    readonly VITE_LOYALTY_PASSWORD: string;
    readonly VITE_JAVA_WRAPPER_SERVICE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}