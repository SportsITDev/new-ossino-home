import { AxiosClient } from '../axiosClient';
import { config } from '../../config';

export interface Category {
    id: string;
    label: string;
    slug: string;
}


class CategoriesApi extends AxiosClient {
    async fetchCategories(): Promise<Category[]> {
        const response = await this.client.get('/api/v5/Content/Topmenu/377');
        if (Array.isArray(response.data)) {
            return response.data.map((item: any) => ({
                id: String(item.displayid),
                label: item.menu_name || '',
                slug: item.menu_link || '',
            }));
        }
        return [];
    }
}

export const categoriesApi = new CategoriesApi(config.contentServiceUrl);