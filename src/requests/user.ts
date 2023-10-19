import { sleep } from '@/utils';
import { api } from '@/requests/main.ts';

interface LoginReqParams {
  id: string;
  password: string;
  remember: boolean;
}

export const LoginReq = async (params: LoginReqParams) => {
  const result = await api.post('/auth/login', params);
  return result.data;
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
    id: '',
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
  return (await api.get('/employee/get', {
    params,
  })).data;
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