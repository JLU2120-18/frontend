import { sleep } from '@/utils';
import { api } from '@/requests/main.ts';

interface GetTimeCardRequest {
  pageIndex: number;
  pageSize: number;
  jwt: string;
}
export const GetTimeCardReq = async (params: GetTimeCardRequest) => {
  const result = await api.get('/timecard/get', { params });
  return result.data;
};

interface UpdateTimeCardRequest {
  id: string;
  jwt: string;
  data: {
    projectName: string;
    duration: number;
  }[];
}
export const UpdateTimeCardReq = async (params: UpdateTimeCardRequest) => {
  await sleep(4000);
  console.log(params);
  return {};
};
