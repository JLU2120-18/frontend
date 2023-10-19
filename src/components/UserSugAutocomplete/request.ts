import { api } from '@/requests';

interface UserSugRequest {
  id: string;
  jwt: string;
}

export const UserSugReq = async (params: UserSugRequest) => {
  const result = await api.get('/employee/sug', {
    params,
  });
  return result.data;
};