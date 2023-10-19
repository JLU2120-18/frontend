import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://app3597.acapp.acwing.com.cn/napi',
});

api.interceptors.response.use((value) => {
  console.log(value);
  return value.data;
});
