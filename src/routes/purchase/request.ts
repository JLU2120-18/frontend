import { api } from '@/requests';

interface GetsPurchaseOrderRequest {
  jwt: string;
  pageIndex: number;
  pageSize: number;
  id?: string;
}

export const GetsPurchaseOrderReq = async (params: GetsPurchaseOrderRequest) => {
  const result = await api.get('/purchase/gets', {
    params,
  });
  return result.data;
};