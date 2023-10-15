import Mock from 'mockjs';
import { sleep } from '@/utils';

interface GetTimeCardRequest {
  current: number;
  pageSize: number;
  jwt: string;
}
export const GetTimeCardReq = async ({ pageSize }: GetTimeCardRequest) => {
  await sleep(1000);
  return Mock.mock({
    total: 100,
    [`list|${pageSize}`]: [
      {
        id: '@guid',
        is_save: '@boolean',
        start_time: '@datetime',
        end_time: '@datetime',
        'duration|10-40': 10,
      },
    ],
  });
};

interface SubmitTimeCardRequest {
  id: string;
  jwt: string;
  duration: number;
}
export const SubmitTimeCardReq = async (params: SubmitTimeCardRequest) => {
  await sleep(4000);
  console.log(params);
  return {};
};
