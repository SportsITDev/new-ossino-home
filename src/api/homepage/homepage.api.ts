import type { ServiceResponse } from '../types/ServiceResponse';
import type { AxiosResponse } from 'axios';
import { AxiosClient } from '../axiosClient';
import { config } from '../../config';

interface ApiLastWin {
    gameName: string;
    betId: string;
    gameId: string;
    amount: number;
    currency: string;
    timestamp: string;
}

interface LastWinsResponse {
    highestWins: any[];
    lastWins: ApiLastWin[];
}

export interface ApiRecentWin {
    amount: number;
    transactionDate: string;
    userId: number;
    userName: string;
    betId: string;
    fixtureName: string;
    gameName: string;
    gameCode: string;
}

class HomePageApi extends AxiosClient {
    async getRecentWins(): Promise<AxiosResponse<ServiceResponse<LastWinsResponse>>> {
        return this.client.get(`/api/v1/user/player-insights`, {
            params: {
                userId: localStorage.getItem('userId') || '',
                types: 'LAST_WINS',
                gameTypes: 'CASINO,NE_GAMES',
                fromDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                toDate: new Date().toISOString(),
            },
        });
    }
}

export const homePageApi = new HomePageApi(config.wrapperServiceUrl);