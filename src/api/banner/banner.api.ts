import { AxiosClient } from '../axiosClient';
import { config } from '../../config';

export interface Banner {
    id: string;
    image: string;
    link?: string;
    title: string;
    description?: string;
    mobileImage?: string;
    thumbnailImage?: string;
    position?: number;
    isActive?: boolean;
}


class BannerApi extends AxiosClient {
    async fetchBanners(): Promise<Banner[]> {
        const response = await this.client.get('/api/v5/Content/banner/377');
        // Map the actual API response to Banner[]
        if (Array.isArray(response.data)) {
            return response.data.map((item: any) => ({
                id: String(item.banner_id),
                image: item.imagepath || '',
                link: item.banner_link || '',
                title: item.banner_name || '',
                description: '',
                mobileImage: item.mobileimageurl || '',
                thumbnailImage: item.tumbnailimageurl || '',
                position: item.displayorder || 0,
                isActive: item.is_active,
            }));
        }
        return [];
    }
}

export const bannerApi = new BannerApi(config.contentServiceUrl);