import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/models';

const LogoutPage = React.memo(() => {
  const nav = useNavigate();
  const userModel = useUserStore();

  React.useLayoutEffect(
    () => {
      userModel.reset();
      nav('/login');
    },
    [],
  );
  return <> </>;
});

export default LogoutPage;