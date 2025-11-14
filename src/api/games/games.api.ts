import type { AxiosResponse } from 'axios';
import { AxiosClient } from '../axiosClient';
import { config } from '../../config';
import type { LaunchDemoGameRequest, LaunchDemoGameResponse, LaunchRealGameRequest, LaunchRealGameResponse } from './games.types';
import type { ServiceResponse } from '../types/ServiceResponse';
import type { Game } from './games.types';

class GamesApi extends AxiosClient {
    async launchDemoGame(data: LaunchDemoGameRequest): Promise<AxiosResponse<LaunchDemoGameResponse>> {
        return this.client.post('/casino/v1/launchDemoGame', data);
    }

    async launchRealGame(data: LaunchRealGameRequest): Promise<AxiosResponse<LaunchRealGameResponse>> {
        return this.client.post('/casino/v1/launchGame', data);
    }

    async fetchGames(): Promise<Game[]> {
        const response = await this.client.get('/api/v5/Content/Casino/377');
        const allGames: Game[] = [];

        if (Array.isArray(response.data)) {
            // Each item in response.data is a category with game_type and game array
            response.data.forEach((category: any) => {
                if (category.game && Array.isArray(category.game)) {
                    const categoryGames = category.game.map((item: any) => ({
                        id: String(item.game_code || item.game_id),
                        title: item.name || item.game_name || '',
                        name: item.name || item.game_name || '',
                        image: item.image?.url || '',
                        provider: item.provider || '',
                        category: [item.categoryname || category.game_type || ''],
                        url: item.url || '',
                        favorite: item.favorite || false,
                        players: item.players || 0,
                        group: item.group || '',
                        providers: item.providers || [],
                        aggregator_type: [item.aggregator_type || ''],
                        categories: [item.categoryname || category.game_type || ''],
                    }));
                    allGames.push(...categoryGames);
                }
            });
        }
        return allGames;
    }

    async fetchGamesByCategory(category: string): Promise<AxiosResponse<ServiceResponse<Game[]>>> {
        return this.client.get(`/api/v1/games/category/${category}`);
    }
}

export const gamesApi = new GamesApi(config.contentServiceUrl);