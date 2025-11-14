import { AxiosClient } from '../axiosClient';
import type { ServiceResponse } from '../types/ServiceResponse';
import type { AxiosResponse } from 'axios';
import { config } from '../../config';

export interface UpdateOptRequest {
    playerId: string;
    operatorId: string;
    brand: string;
    promotionId: string;
    optIn: boolean;
    missionType: string;
}

export interface UpdateOptResponse {
    id: number;
    status: string;
    message: string;
    playerId: string;
    promotionId: string;
    optIn: boolean;
    startedAt: string;
}

export interface LeaderboardEntry {
    playerId: string;
    rankPosition: number;
    metricValue: number | null;
    metricType: string;
}

export interface GetLeaderboardRequest {
    promotionId?: string;
    playerId?: string;
    leaderboardSize?: string;
}

export interface CurrentPlayer {
    playerId: string;
    rankPosition: number;
    metricValue: number | null;
    metricType: string;
}

export interface GetLeaderboardResponse {
    leaderboard: LeaderboardEntry[];
    currentPlayer: CurrentPlayer | null;
}

class PromotionsApi extends AxiosClient {
    async updateOpt(data: UpdateOptRequest): Promise<UpdateOptResponse> {
        const response = await this.client.post(
            `/promotion/v1/leaderboard/opt`,
            data,
        );
        return response.data.result;
    }

    async getLeaderboardPromotions(
        operatorId: string,
    ): Promise<ServiceResponse<GetLeaderboardResponse>> {
        const response = await this.client.get(
            `/promotion/v1/leaderboard/promotions?operatorId=${operatorId}`,
        );
        return response.data.result;
    }

    async getLeaderboard(
        data: GetLeaderboardRequest,
    ): Promise<GetLeaderboardResponse> {
        const response = await this.client.post(`/v1/leaderboard/standings`, data);
        return response.data.result;
    }

    async fetchPromotions(): Promise<AxiosResponse<ServiceResponse<any>>> {
        return this.client.post('/api/v5/Content/offerlinkinfo/377');
    }
}

export const promotionsApi = new PromotionsApi(config.wrapperServiceUrl);