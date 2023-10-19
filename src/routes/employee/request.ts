import { api } from '@/requests';

interface GetPurchaseOrderRequest {
  jwt: string;
  pageIndex: number;
  pageSize: number;
  id?: string;
}


export const GetEmployeeReq = async (params: GetPurchaseOrderRequest) => {
  const result = await api.get('/employee/gets', {
    params,
  });
  return result.data;
};