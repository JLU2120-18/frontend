import { sleep } from '@/utils';
import Mock from 'mockjs';

interface GetTimeCardRequest {
  current: number;
  pageSize: number;
  jwt: string;
}
export const GetTimeCardReq = async ({ pageSize }: GetTimeCardRequest) => {
  await sleep(1000);
  return Mock.mock({
    total: 100,
    [`data|${pageSize}`]: [
      {
        id: '@guid',
        isSave: '@boolean',
        'data|1-3': [
          {
            projectName: '@last',
            'duration|10-40': 10,
          },
        ],
        startTime: '@datetime',
        endTime: '@datetime',
      },
    ],
  });
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
