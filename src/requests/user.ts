import { sleep } from '@/utils';
import Mock from 'mockjs';

interface LoginReqParams {
  username: string;
  password: string;
  remember: boolean;
}

export const LoginReq = async (params: LoginReqParams) => {
  await sleep(1000);
  console.log(params);

  return Mock.mock({
    id: '@id',
    username: '@first',
    'role|1': ['commission', 'employee', 'payroll'],
    jwt: '@guid',
  });
};

interface RegisterReqParams {
  username: string;
  password: string;
  remember: boolean;
}

export const RegisterReq = async (params: RegisterReqParams) => {
  await sleep(3000);
  console.log(params);

  return {
    id: '' + (Math.random() * 1000 | 0),
    username: '' + (Math.random() * 100000 | 0),
    avatar: 'https://sdfsdf.dev/100x100.png',
    jwt: Array.from({ length: 1000 }, () => (Math.random() * 36).toString(36)),
  };
};

interface GetUserInfoReqParam {
  jwt: string
}

interface GetUserInfoRes {
  id: string;
  username: string;
  address: string;
  phone: string;
  socsec_id: string;
  tax_rate: 0.1;
  other_cast: 50;
  type: 'salary' | 'commission' | 'wage';
  payment: 'bank' | 'receive' | 'mail';
  salary: number;
  duration_limit: number;
  bank_name?: string;
  bank_account?: string;
  mail_address?: string;
}
export const GetUserInfoReq = async (params: GetUserInfoReqParam): Promise<GetUserInfoRes> => {
  await sleep(1000);
  console.log(params);

  return Mock.mock({
    id: '@id',
    username: '@first',
    address: '@address',
    phone: '@phone',

    socsec_id: '@guid',
    tax_rate: '@natural',
    'other_cast|90-250': 1,

    type: 'salary',
    payment: 'bank',
    salary: 3000,
    duration_limit: 40,

    bank_name: '汇丰渣打银行',
    bank_account: '89634 29834814',
  });
};

interface UpdatePaymentRequest {
  jwt: string;
  payment: 'mail' | 'receive' | 'bank';
  bank_name?: string;
  bank_account?: string;
  mail_address?: string;
}
export const UpdatePaymentReq = async (params: UpdatePaymentRequest) => {
  await sleep(2000);
  console.log(params);

  return {};
};