import { FormRule } from 'antd';
import { UserSugReq } from './request';

export const userExist = (jwt: string): FormRule => {
  return {
    async validator(_, value: string) {
      const resp = await UserSugReq({ id: value, jwt });
      const data = resp.data;
      if (data.includes(value)) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('不存在此用户'));
    },
  };
};