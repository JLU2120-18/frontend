import { api } from '@/requests/main.ts';

interface GetTimeCardRequest {
  pageIndex: number;
  pageSize: number;
  jwt: string;
}
export const GetTimeCardReq = async (params: GetTimeCardRequest) => {
  const result = await api.get('/timecard/get', { params });
  const data = result.data;

  // FIXME
  data.data = data.data.map(({ timeCard, data }: any) => ({
    ...timeCard,
    data,
  }));

  return data;
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
  const result = await api.post('/timecard/update', params);
  return result.data;
};
