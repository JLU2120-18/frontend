import React from 'react';
import { Button, Form, InputNumber, Popover, Space } from 'antd';

interface Props {
  record: Record<string, any>;
  v: number;
  onSubmit?: (data: Record<string, any>) => void;
  loading?: boolean;
}

export const SubmitDurationButton = React.memo(({ v, record, onSubmit, loading }: Props) => {
  const [form] = Form.useForm();

  if (record.is_save) {
    return v;
  }

  return (
    <Popover trigger={'click'} content={(
      <div className={'flex items-center'}>
        <Form form={form} onFinish={onSubmit} onFinishFailed={console.log}>
          <Space size={'small'}>
            <Form.Item noStyle name={'duration'} rules={[{ required: true, type: 'number', min: 10, max: 40 }]}>
              <InputNumber className={'w-150px'} size={'small'} placeholder={'请输入你的工时'} />
            </Form.Item>
            <Form.Item noStyle>
              <Button loading={loading} size={'small'} type={'primary'} htmlType={'submit'}>提交</Button>
            </Form.Item>
          </Space>
        </Form>
      </div>
    )}
    >
      <Button size={'small'}>提报</Button>
    </Popover>
  );
});