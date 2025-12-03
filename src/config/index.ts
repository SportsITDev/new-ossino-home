export const config = {
  wrapperServiceUrl: import.meta.env.VITE_WRAPPER_SERVICE_URL,
  loyaltyServiceUrl: import.meta.env.VITE_LOYALTY_SERVICE_URL,
  contentServiceUrl: import.meta.env.VITE_CONTENT_SERVICE_URL,
  gamesServiceUrl: import.meta.env.VITE_GAMES_SERVICE_URL,
  websiteUrl: import.meta.env.VITE_WEBSITE_URL,
  brandId: import.meta.env.VITE_BRAND_ID,
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  platformId: import.meta.env.VITE_PLATFORM_ID,
  operatorId: import.meta.env.VITE_OPERATOR_ID,
  loyaltyUsername: import.meta.env.VITE_LOYALTY_USERNAME,
  loyaltyPassword: import.meta.env.VITE_LOYALTY_PASSWORD,
  javaWrapperServiceUrl: import.meta.env.VITE_JAVA_WRAPPER_SERVICE_URL,
} as const;
