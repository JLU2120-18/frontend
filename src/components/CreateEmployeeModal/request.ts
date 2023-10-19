import { Employee } from '@/types';
import { api } from '@/requests';

type CreateEmployeeRequest = Exclude<Employee, 'id'> & {
  jwt: string;
};

export const CreateEmployeeReq = async (params: CreateEmployeeRequest) => {
  const result = await api.post('/employee/create', params);
  return result.data;
};