import type { LoginResponseData } from 'api/auth/auth.types';
import type { ServiceResponse } from 'api/types/ServiceResponse';
import type { AxiosResponse } from 'axios';
import { handleResponse } from 'store/helpers/handleResponse';
import type { UserData } from './slice';

export const handleLoginResponse = (
  response: AxiosResponse<ServiceResponse<LoginResponseData>>,
) => {
  const { accessToken, player_details } = handleResponse(response);
  // Handle both camelCase and snake_case API responses for emailVerified
  const emailVerified = player_details.userOtherInfo.emailVerified ?? 
    (player_details.userOtherInfo as any).email_verified ?? 
    false;

  const userData = {
    id: player_details.userId,
    firstName: player_details.firstName,
    lastName: player_details.lastName,
    userName: player_details.nickName,
    email: player_details.userOtherInfo.email,
    brand: player_details.userOtherInfo.brand,
    city: player_details.userOtherInfo.city,
    emailVerified,
    twoFactorEnabled: player_details.userOtherInfo.mfaenabled,
    userRefCode: player_details.userRefCode,
    vip: player_details.userOtherInfo.vip || false,
    affliateBtag: player_details.userOtherInfo.affliateBtag,
  } as UserData;

  return { accessToken, userData };
};
