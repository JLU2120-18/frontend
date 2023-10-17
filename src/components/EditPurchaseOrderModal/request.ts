import { PurchaseOrder } from '@/types';
import { sleep } from '@/utils';

interface UpdatePurchaseOrderRequest extends PurchaseOrder {
  jwt: string;
}

export const UpdatePurchaseOrderReq = async (params: UpdatePurchaseOrderRequest) => {
  await sleep(3000);

  console.log('update purchase order', params);
  return {};
};
