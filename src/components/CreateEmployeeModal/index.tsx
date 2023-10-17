import React from 'react';
import { Form, Input, InputNumber, Modal, ModalProps, Select } from 'antd';
import { required } from '@/utils';
import { useUserStore } from '@/models';
import { useRequest } from 'ahooks';
import { CreateEmployeeReq } from './request';
import { CondFormItem } from '@/components';
import { SALARY_TYPE_OPTIONS } from '@/constants';

interface Props extends ModalProps {
  onCreateOk?: (id: string) => void;
}

export const CreateEmployeeModal = React.memo((props: Props) => {
  const [form] = Form.useForm();
  const { jwt = '' } = useUserStore().userInfo;
  const { onCreateOk } = props;
  const createEmployeeReq = useRequest(CreateEmployeeReq, {
    manual: true,
    onSuccess: ({ id }) => onCreateOk?.(id),
  });
  const handleOk = async () => {
    console.log(form.getFieldsValue());
    const values = await form.validateFields();
    createEmployeeReq.run({
      ...values,
      jwt,
    });
  };

  return (
    <Modal
      {...props}
      onOk={handleOk}
      confirmLoading={createEmployeeReq.loading}
      title={'添加员工'}
    >
      <Form layout={'vertical'} form={form}>
        <Form.Item
          name={'id'}
          label={'ID'}
          rules={[required()]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={'username'}
          label={'员工姓名'}
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
          name={'socsecId'}
          label={'社保卡'}
          rules={[required()]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={'taxRate'}
          label={'税率'}
          rules={[required()]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={'otherCast'}
          label={'其他费用'}
          rules={[required()]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={'durationLimit'}
          label={'工时限制'}
          rules={[required()]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={'type'}
          label={'发薪类型'}
          rules={[required()]}
        >
          <Select options={SALARY_TYPE_OPTIONS} />
        </Form.Item>
        <CondFormItem
          keys={['type']}
          cond={(type) => type === 'wage'}
          name={'hourWage'}
          label={'时薪'}
          rules={[required()]}
        >
          <InputNumber />
        </CondFormItem>
        <CondFormItem
          keys={['type']}
          cond={(type) => ['commission', 'salary'].includes(type)}
          name={'salary'}
          label={'工资'}
          rules={[required()]}
        >
          <InputNumber />
        </CondFormItem>
        <CondFormItem
          keys={['type']}
          cond={(type) => type === 'commission'}
          name={'commissionRate'}
          label={'佣金率'}
          rules={[required()]}
        >
          <InputNumber />
        </CondFormItem>
      </Form>
    </Modal>
  );
});