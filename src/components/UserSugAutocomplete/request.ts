import { sleep } from '@/utils';
import Mock from 'mockjs';

interface UserSugRequest {
  id: string;
}

export const UserSugReq = async (params: UserSugRequest) => {
  await sleep(500);
  console.log('user sug', params);
  return Mock.mock({
    'data|10': ['@id'],
  });
};