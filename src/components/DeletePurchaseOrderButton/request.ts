import { api } from '@/requests';

interface DeletePurchaseRequest {
  jwt: string;
  id: string;
}
export const DeletePurchaseReq = async (params: DeletePurchaseRequest) => {
  const result = await api.post('/purchase/delete', params);
  return result.data;
};
