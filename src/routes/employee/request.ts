import { sleep } from '@/utils';
import Mock from 'mockjs';

interface GetPurchaseOrderRequest {
  jwt: string;
  pageIndex: number;
  pageSize: number;
  id?: string;
}


export const GetEmployeeReq = async (params: GetPurchaseOrderRequest) => {
  await sleep(2000);
  return Mock.mock({
    total: 100,
    [`data|${params.pageSize}`]: [{
      id: '@guid',
      username: '@name',
      address: '@address',
      phone: '@phone',
      socsecId: '@guid',
      taxRate: '@float(0.0,0.3)',
      otherCast: '@integer(100,500)',
      type: Mock.Random.pick(['salary', 'commission', 'wage']),
      hourWage: '@integer(50,60)',
      salary: '@integer(4000,8000)',
      commissionRate: '@float(0.1,0.4)',
      durationLimit: '@integer(40,50)',
    }],
  });
};