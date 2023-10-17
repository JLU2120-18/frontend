import { sleep } from '@/utils';

interface DeletePurchaseRequest {
  jwt: string;
  id: string;
}
export const DeleteEmployeeReq = async (params: DeletePurchaseRequest) => {
  await sleep(4000);

  console.log('delete purchase', params);
  return {};
};
