import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/models';
import { message } from 'antd';

const PATHS = [
  '/',
];

export const RouteGuard = React.memo((props: React.PropsWithChildren) => {
  const location = useLocation();
  const userModel = useUserStore();
  const navigate = useNavigate();
  const [msg, ctx] = message.useMessage();

  React.useEffect(
    () => {
      if (PATHS.includes(location.pathname) && !userModel.userInfo.id) {
        msg.error('未登录，请先登录你的账号');
        navigate('/login');
      }
    },
    [location.pathname],
  );

  return (
    <>
      {ctx}
      {props.children}
    </>
  );
});
