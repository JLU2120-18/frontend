import { sleep } from '@/utils';
import Mock from 'mockjs';

interface GetPurchaseOrderRequest {
  jwt: string;
  pageIndex: number;
  pageSize: number;
  id?: string;
}



export const GetPurchaseOrderReq = async (params: GetPurchaseOrderRequest) => {
  await sleep(2000);
  return Mock.mock({
    total: 100,
    [`data|${params.pageSize}`]: [{
      id: '@guid',
      employeeId: '@id',
      productName: '@first',
      phone: '@phone',
      address: '@address',
      date: '@date',
      'pay|10-100': 1,
    }],
  });
};