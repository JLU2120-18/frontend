import React from 'react';

import { useUserStore } from '@/models';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

export function useAuth(role: ('employee' | 'commission' | 'payroll')[]) {
  const userModel = useUserStore();
  const { role: userRole } = userModel.userInfo;

  const navigate = useNavigate();

  React.useEffect(
    () => {
      if (!userRole || !role.includes(userRole)) {
        message.error('你没有权限进入此页面');
        navigate('/');
      }
    },
    [],
  );
}