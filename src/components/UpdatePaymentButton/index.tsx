import React from 'react';
import { Button, ButtonProps, Typography } from 'antd';

interface Props extends ButtonProps {
  v: 'mail' | 'receive' | 'bank';
}
export const UpdatePaymentButton = React.memo((props: Props) => {
  const { v } = props;
  const text = (() => {
    switch (v) {
    case 'receive': return '领取';
    case 'bank': return '银行付款';
    case 'mail': return '邮件';
    default: return 'UNKNOWN';
    }
  })();
  return (
    <div className={'flex gap-2 items-center'}>
      <Typography.Text>
        {text}
      </Typography.Text>
      <Button {...props} type={'primary'} size={'small'}>修改</Button>
    </div>
  );
});