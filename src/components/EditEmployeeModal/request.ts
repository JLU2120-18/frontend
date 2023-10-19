import { Employee } from '@/types';
import { api } from '@/requests';

interface UpdateEmployeeRequest extends Employee {
  jwt: string;
}

export const UpdateEmployeeReq = async (params: UpdateEmployeeRequest) => {
  const result = await api.post('/employee/update', params);
  return result.data;
};
