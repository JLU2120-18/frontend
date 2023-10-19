import { api } from '@/requests';

interface DeletePurchaseRequest {
  jwt: string;
  id: string;
}
export const DeleteEmployeeReq = async (params: DeletePurchaseRequest) => {
  const result = await api.post('/employee/delete', params);
  return result.data;
};
