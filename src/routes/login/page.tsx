import React from 'react';
import { Card, Form, Input, Checkbox, Button, Typography } from 'antd';
import { LoginReq } from '@/requests';
import { useRequest } from 'ahooks';
import { UserInfo, useUserStore } from '@/models';
import { useNavigate } from 'react-router-dom';

const LoginPage = React.memo(() => {
  const [form] = Form.useForm();

  const userModel = useUserStore();
  const navigate = useNavigate();

  const loginReq = useRequest(LoginReq, {
    manual: true,
    onSuccess: (data: UserInfo) => {
      userModel.setUserInfo(data);
      navigate('/');
    },
  });

  return (
    <div className={'w-screen h-screen center'}>
      <div>
        <div className={'center gap-2'}>
          <div className={'i-ant-design:account-book-filled'} text={'40px blue-7'} />
          <h2 className={'w-fit m0'}>Prophet Salary</h2>
        </div>
        <Card className={'shadow-md w-400px m10'}>
          <h1 className={'mb9'} text={'blue-5 center'}>
            登录你的账号
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
            <div className={'flex justify-between items-center pb5'}>
              <Form.Item noStyle name={'remember'} valuePropName={'checked'}>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
              <Form.Item noStyle>
                <Typography.Link className={'h-fit'} href={'/register'}>
                  没有帐号？
                </Typography.Link>
              </Form.Item>
            </div>
            <Button
              type={'primary'}
              className={'w-full'}
              size={'large'}
              onClick={() => loginReq.run(form.getFieldsValue())}
              loading={loginReq.loading}
            >
              登录
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
});

export default LoginPage;