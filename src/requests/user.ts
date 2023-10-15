import { sleep } from '@/utils';

interface LoginReqParams {
  username: string;
  password: string;
  remember: boolean;
}

export const LoginReq = async (params: LoginReqParams) => {
  await sleep(3000);
  console.log(params);

  return {
    id: 'liangyihong',
    username: '梁毅宏',
    role: 'commission' as ('employee' | 'commission' | 'payroll'),
    jwt: Array.from({ length: 1000 }, () => (Math.random() * 36).toString(36)).join(''),
  };
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
export const GetUserInfoReq = async (params: GetUserInfoReqParam) => {
  await sleep(1000);
  console.log(params);

  return {
    id: 'liangyihong',
    username: '梁毅宏',
    address: '翻斗花园二号楼1001室',
    phone: '+86 11144551144',

    socsec_id: '1123 4567 8901 23',
    tax_rate: 0.1,
    other_cast: 50,

    type: 'salary' as ('salary' | 'commission' | 'wage'),
    payment: 'bank',
    salary: 3000,
    duration_limit: 40,

    bank_name: '汇丰渣打银行',
    bank_account: '89634 29834814',
  };
};
