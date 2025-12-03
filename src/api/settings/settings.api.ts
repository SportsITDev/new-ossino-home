import { CLIENT_TYPE } from 'constants/clientType';
import { AxiosClient } from 'api/axiosClient';
import { config } from 'config/index';
import { STORAGE_KEYS } from 'constants/storage';
import { LocalStorageHelper } from 'helpers/storage';
import type { UpdatePlayerDetailsRequest, SelfExclusionRequest, SelfExclusionResponse } from './settings.types';

const { wrapperServiceUrl, javaWrapperServiceUrl } = config;

class JavaWrapperClient extends AxiosClient {
  public get apiClient() {
    return this.client;
  }
}

class SettingsApi extends AxiosClient {
  private javaWrapperApi: JavaWrapperClient;

  constructor() {
    super(wrapperServiceUrl);
    this.javaWrapperApi = new JavaWrapperClient(javaWrapperServiceUrl);
  }

  async getPlayerDetails() {
    const result = await this.client.post('/api/v1/player/details', { clientType: CLIENT_TYPE });
    return result;
  }

  async updatePlayerDetails(data: UpdatePlayerDetailsRequest, file?: File) {
    const formData = new FormData();
    
    const accessToken = LocalStorageHelper.getItem(STORAGE_KEYS.accessToken);
    if (accessToken && typeof accessToken === 'string') {
      formData.append('Authorization', accessToken);
    }
    
    formData.append('userUpdateDto', JSON.stringify(data));
    
    if (file) {
      formData.append('file', file);
    }
    
    const result = await this.javaWrapperApi.apiClient.put('/fe/player/update', formData, {
    
      
    });
    return result;
  }

  async updateUserLimits(data: SelfExclusionRequest): Promise<SelfExclusionResponse> {
    const result = await this.client.post('/api/v1/player/userlimits/update', data);
    return result.data;
  }
}

// Create instance
const SettingsInstance = new SettingsApi();

export { 
  SettingsInstance as SettingsApi 
};
