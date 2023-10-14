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
    id: '' + (Math.random() * 1000 | 0),
    username: '' + (Math.random() * 100000 | 0),
    avatar: 'https://sdfsdf.dev/100x100.png',
    jwt: Array.from({ length: 1000 }, () => (Math.random() * 36).toString(36)),
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