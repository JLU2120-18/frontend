import { Employee } from '@/types';
import { sleep } from '@/utils';

interface UpdateEmployeeRequest extends Employee {
  jwt: string;
}

export const UpdateEmployeeReq = async (params: UpdateEmployeeRequest) => {
  await sleep(3000);

  console.log('update employee', params);
  return {};
};
