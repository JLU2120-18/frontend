import React from 'react';
import { DatePicker, Form, Input, InputNumber, message, Modal, ModalProps } from 'antd';
import { PurchaseOrder } from '@/types';
import { required } from '@/utils';
import { useRequest } from 'ahooks';
import { UpdatePurchaseOrderReq } from './request';
import { useUserStore } from '@/models';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

interface Props extends ModalProps {
  record?: PurchaseOrder;
  onOk?: () => void;
}

export const EditPurchaseOrderModal = React.memo((props: Props) => {
  const { record, onOk } = props;

  const [form] = Form.useForm();

  const navigate = useNavigate();
  const updatePurchaseOrderReq = useRequest(UpdatePurchaseOrderReq, {
    manual: true,
    onSuccess: onOk,
    onError: () => {
      message.error('身份信息过期，修改失败，请重新登录');
      navigate('/login');
    },
  });
  const { jwt = '' } = useUserStore().userInfo;

  const handleOk = async () => {
    const values = await form.validateFields();
    values.date = dayjs(values.date).format('YYYY-MM-DD hh:mm:ss');
    updatePurchaseOrderReq.run({ ...values, jwt });
  };

  const newRecord = React.useMemo(
    () =>
      record ? {
        ...record,
        date: dayjs(record.date),
      } : undefined
    ,
    [record],
  );

  React.useEffect(
    () => {
      form.setFieldsValue(newRecord);
    },
    [newRecord],
  );

  return (
    <Modal
      {...props}
      onOk={handleOk}
      confirmLoading={updatePurchaseOrderReq.loading}
      title={'编辑采购订单'}
    >
      <Form layout={'vertical'} form={form} initialValues={newRecord}>
        <Form.Item
          name={'id'}
          label={'ID'}
          rules={[required()]}
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item
          name={'employeeId'}
          label={'员工ID'}
          rules={[required()]}
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item
          name={'productName'}
          label={'项目名'}
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