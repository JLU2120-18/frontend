import { PurchaseOrder } from '@/types';
import { api } from '@/requests';

type CreatePurchaseOrderRequest = Exclude<PurchaseOrder, 'id'> & {
  jwt: string;
};

export const CreatePurchaseOrderReq = async (params: CreatePurchaseOrderRequest) => {
  const result = await api.post('/purchase/create', params);
  return result.data;
};