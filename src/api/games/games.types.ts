export interface LaunchDemoGameRequest {
    playerId?: string;
    platformId?: number;
    operatorId?: string;
    brandId?: string;
    playerToken?: string;
    currencyCode?: string;
    gameId?: string;
    aggregator?: string;
    provider?: string;
    technology?: string;
    gamePlatform?: string;
    playerIp?: string;
    timestamp?: number;
    countryCode?: string;
}

export interface LaunchDemoGameResponse {
    launchUrl?: string | null;
    message?: string;
    [key: string]: unknown;
}

export interface LaunchRealGameRequest {
    playerId?: string;
    platformId?: number;
    operatorId?: string;
    brandId?: string;
    playerToken?: string;
    currencyCode?: string;
    gameId?: string;
    aggregator?: string;
    provider?: string;
    technology?: string;
    gamePlatform?: string;
    playerIp?: string;
    timestamp?: number;
    countryCode?: string;
    balance?: string;
    jurisdiction?: string;
    lobbyUrl?: string;
    depositUrl?: string;
}

export interface LaunchRealGameResponse {
    launchUrl?: string | null;
    message?: string;
    [key: string]: unknown;
}

export interface Game {
    id: string;
    title: string;
    name?: string;
    image: string;
    provider: string;
    category: string[];
    url?: string;
    favorite?: boolean;
    players?: number;
    group?: string;
    providers?: string[];
    aggregator_type?: string[];
    categories?: string[];
}

export type ProviderCode = string;

export interface GameData {
    id: string;
    title: string;
    name?: string;
    image: string;
    provider: ProviderCode;
    category: string[];
    url?: string;
    favorite?: boolean;
    players?: number;
    group?: string;
    providers?: ProviderCode[];
    aggregator_type?: string[];
    categories?: string[];
}