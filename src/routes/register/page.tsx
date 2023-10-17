import { Button, Card, Form, Input, Typography } from 'antd';
import React from 'react';
import { useRequest } from 'ahooks';
import { RegisterReq } from '@/requests';

const RegisterPage = React.memo(() => {
  const [form] = Form.useForm();

  const registerReq = useRequest(RegisterReq,{
    manual: true,
    onSuccess: (data, params) => {
      console.log(data, params);
    },
  });

  return (
    <div className={'w-screen h-screen center'}>
      <div>
        <div className={'center gap-2'}>
          <div className={'i-ant-design:account-book-filled text-40px text-blue-7'} />
          <h2 className={'w-fit m0'}>Prophet Salary</h2>
        </div>
        <Card className={'shadow-md w-400px m10'}>
          <h1 className={'mb9 text-blue-5 center'}>
            注册新的账号
          </h1>
          <Form
            form={form}
            layout={'vertical'}
          >
            <Form.Item label={'用户名'} name={'username'}>
              <Input size={'large'} />
            </Form.Item>
            <Form.Item label={'密码'} name={'password'}>
              <Input.Password size={'large'} />
            </Form.Item>
            <div className={'flex justify-end items-center pb5'}>
              <Form.Item noStyle>
                <Typography.Link className={'h-fit'} href={'/login'}>
                  已有帐号？点我登录
                </Typography.Link>
              </Form.Item>
            </div>
            <Button
              type={'primary'}
              className={'w-full'}
              size={'large'}
              onClick={() => registerReq.run(form.getFieldsValue())}
              loading={registerReq.loading}
            >
              注册
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
});

export default RegisterPage;