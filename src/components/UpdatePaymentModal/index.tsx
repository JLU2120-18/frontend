import React from 'react';
import { Form, Input, message, Modal, ModalProps, Select } from 'antd';
import { required, toSnake } from '@/utils';
import { CondFormItem } from '@/components';
import { useRequest } from 'ahooks';
import { UpdatePaymentReq } from '@/requests';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/models';

const PAYMENT_OPTIONS = [
  { label: '银行支付', value: 'bank' },
  { label: '领取', value: 'receive' },
  { label: '邮寄', value: 'mail' },
];

interface Props extends ModalProps {
  payment?: 'bank' | 'receive' | 'mail';
  bankName?: string;
  bankAccount?: string;
  mailAddress?: string;
}

export const UpdatePaymentModal = React.memo((props: Props) => {
  const { onOk } = props;

  const [form] = Form.useForm();

  const navigate = useNavigate();
  const updatePaymentReq = useRequest(UpdatePaymentReq, {
    manual: true,
    onSuccess: (data) => {
      message.success('修改成功');
      onOk?.(data as any);
    },
    onError: () => {
      message.error('身份信息过期，修改失败，请重新登录');
      navigate('/login');
    },
  });

  const { jwt = '' } = useUserStore().userInfo;
  const handleOk = async () => {
    try {
      await form.validateFields();
      updatePaymentReq.run({
        ...form.getFieldsValue(),
        jwt,
      });
    }
    catch(e: any) {
      console.log('update payment error: ', e);
    }
  };

  return (
    <Modal
      {...props}
      title={'修改发薪方式'}
      confirmLoading={updatePaymentReq.loading}
      onOk={handleOk}
    >
      <Form
        form={form}
        className={'pt-5'}
        initialValues={{
          ...toSnake(props),
        }}
        layout={'vertical'}
      >
        <Form.Item name={'payment'} label={'目标方式'}>
          <Select options={PAYMENT_OPTIONS}/>
        </Form.Item>
        <CondFormItem
          keys={['payment']}
          cond={(payment) => payment === 'bank'}
          name={'bank_name'}
          label={'银行'}
          rules={[required()]}
        >
          <Input />
        </CondFormItem>
        <CondFormItem
          keys={['payment']}
          cond={(payment) => payment === 'bank'}
          name={'bank_account'}
          label={'银行账户'}
          rules={[required()]}
        >
          <Input />
        </CondFormItem>
        <CondFormItem
          keys={['payment']}
          cond={(payment) => payment === 'mail'}
          name={'mail_address'}
          label={'邮件地址'}
          rules={[required()]}
        >
          <Input />
        </CondFormItem>
      </Form>
    </Modal>
  );
});