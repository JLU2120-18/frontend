import { PurchaseOrder } from '@/types';
import { api } from '@/requests';

interface UpdatePurchaseOrderRequest extends PurchaseOrder {
  jwt: string;
}

export const UpdatePurchaseOrderReq = async (params: UpdatePurchaseOrderRequest) => {
  const result = await api.post('/purchase/update', params);
  return result.data;
};
