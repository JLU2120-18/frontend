import { sleep } from '@/utils';
import Mock from 'mockjs';
import { Employee } from '@/types';

type CreateEmployeeRequest = Exclude<Employee, 'id'> & {
  jwt: string;
};

export const CreateEmployeeReq = async (params: CreateEmployeeRequest) => {
  await sleep(1000);
  console.log('create purchase order', params);

  return Mock.mock({
    id: '@guid',
  });
};