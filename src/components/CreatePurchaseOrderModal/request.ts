import { sleep } from '@/utils';
import Mock from 'mockjs';
import { PurchaseOrder } from '@/types';

type CreatePurchaseOrderRequest = Exclude<PurchaseOrder, 'id'> & {
  jwt: string;
};

export const CreatePurchaseOrderReq = async (params: CreatePurchaseOrderRequest) => {
  await sleep(1000);
  console.log('create purchase order', params);

  return Mock.mock({
    id: '@guid',
  });
};