import React from 'react';
import { DatePicker, Form, Input, InputNumber, Modal, ModalProps } from 'antd';
import { required } from '@/utils';
import { useUserStore } from '@/models';
import { useRequest } from 'ahooks';
import { CreatePurchaseOrderReq } from './request';
import { UserSugAutoComplete } from '@/components';

interface Props extends ModalProps {
  onCreateOk?: (id: string) => void;
}

export const CreatePurchaseOrderModal = React.memo((props: Props) => {
  const [form] = Form.useForm();
  const { jwt = '' } = useUserStore().userInfo;
  const { onCreateOk } = props;
  const createPurchaseOrderReq = useRequest(CreatePurchaseOrderReq, {
    manual: true,
    onSuccess: ({ id }) => onCreateOk?.(id),
  });
  const handleOk = async () => {
    console.log(form.getFieldsValue());
    const values = await form.validateFields();
    createPurchaseOrderReq.run({
      ...values,
      jwt,
    });
  };

  return (
    <Modal
      {...props}
      title={'创建采购订单'}
      onOk={handleOk}
      confirmLoading={createPurchaseOrderReq.loading}
    >
      <Form
        layout={'vertical'}
        form={form}
      >
        <Form.Item
          name={'employeeId'}
          label={'负责员工'}
          rules={[required()]}
        >
          {/*<AutoComplete />*/}
          <UserSugAutoComplete />
        </Form.Item>
        <Form.Item
          name={'productName'}
          label={'产品名'}
          rules={[required()]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={'phone'}
          label={'联系电话'}
          rules={[required()]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={'address'}
          label={'住址'}
          rules={[required()]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={'date'}
          label={'日期'}
          rules={[required()]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name={'pay'}
          label={'金额'}
          rules={[required()]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
});