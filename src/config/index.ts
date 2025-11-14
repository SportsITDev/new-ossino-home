export const config = {
    wrapperServiceUrl: import.meta.env.VITE_WRAPPER_SERVICE_URL || 'http://localhost:3001',
    loyaltyServiceUrl: import.meta.env.VITE_LOYALTY_SERVICE_URL || 'http://localhost:3001',
    contentServiceUrl: import.meta.env.VITE_CONTENT_SERVICE_URL || 'http://localhost:3001',
    gamesServiceUrl: import.meta.env.VITE_GAMES_SERVICE_URL || 'http://localhost:3001',
    brandId: import.meta.env.VITE_BRAND_ID || '1',
    googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
    platformId: import.meta.env.VITE_PLATFORM_ID || '1',
    operatorId: import.meta.env.VITE_OPERATOR_ID || '1',
    loyaltyUsername: import.meta.env.VITE_LOYALTY_USERNAME || '',
    loyaltyPassword: import.meta.env.VITE_LOYALTY_PASSWORD || '',
} as const;