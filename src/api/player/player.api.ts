import { CLIENT_TYPE } from 'constants/clientType';
import { config } from 'config/index';
import type { ServiceResponse } from 'api/types/ServiceResponse';
import type { AxiosResponse } from 'axios';
import { AxiosClient } from '../axiosClient';
import type { AccountHistoryRequest, AccountHistoryResponse, PlayerHistoryRequest, PlayerHistoryResponse, CasinoBetHistoryRequest, CasinoBetHistoryResponse, UploadKycRequest, UploadKycResponse, CasinoBetHistoryWithRoundRequest } from './player.types';

const { wrapperServiceUrl, javaWrapperServiceUrl } = config;

class PlayerApi extends AxiosClient {
  getAccountHistory(data: AccountHistoryRequest): Promise<AxiosResponse<ServiceResponse<AccountHistoryResponse>>> {
    return this.client.post('/api/v2/player/new/accounthistory', data);
  }

  getHistory(data: PlayerHistoryRequest): Promise<AxiosResponse<ServiceResponse<PlayerHistoryResponse>>> {
    return this.client.post('/api/v1/player/history', data);
  }

  getCasinoBetHistory(data: CasinoBetHistoryRequest): Promise<AxiosResponse<ServiceResponse<CasinoBetHistoryResponse>>> {
    return this.client.post('/api/v1/player/casino/bethistory', data);
  }

  getCasinoBetHistoryWithRound(data: CasinoBetHistoryWithRoundRequest): Promise<AxiosResponse<ServiceResponse<CasinoBetHistoryResponse>>> {
    return this.client.post('/api/v1/player/bethistory/casino/history', data);
  }
  getCasinoBetHistoryWithRoundIdData(data: CasinoBetHistoryWithRoundRequest): Promise<AxiosResponse<ServiceResponse<CasinoBetHistoryResponse>>> {
    return this.client.post('/api/v1/player/bethistory/casino/roundId', data);
  }

  getKycTypes() {
    return this.client.post('/api/v1/player/kyc/types', { clientType: CLIENT_TYPE });
  }

  uploadKyc(data: UploadKycRequest, accessToken: string) {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('Authorisation', accessToken);
    if (data.selfie) formData.append('selfie', data.selfie);

    const params = new URLSearchParams({
      idType: data.idType,
      kycType: data.kycType,
    });


    console.log('FormData entries:');
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`- ${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
      } else {
        console.log(`- ${key}: ${value}`);
      }
    }

    return this.client.post<UploadKycResponse>(
      `/fe/player/kyc/upload?${params.toString()}`,
      formData
    )
  }
}

const playerApiInstance = new PlayerApi(wrapperServiceUrl);
const javaPlayerApiInstance = new PlayerApi(javaWrapperServiceUrl);

export {
  playerApiInstance as PlayerApi,
  javaPlayerApiInstance as JavaPlayerApi
}; 