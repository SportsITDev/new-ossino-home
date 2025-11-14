import { config } from '../../config/index';
import { AxiosClient } from '../axiosClient';

class ContentApi extends AxiosClient {
    async getPromotions() {
        const response = await this.client.post(
            `/api/v5/Content/offerlinkinfo/${config.brandId}`
        );
        return response;
    }
}

export const contentApi = new ContentApi(config.contentServiceUrl);