import React from 'react';
import { Button, Form, Input, InputNumber, Popover, Space, Table } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { required } from '@/utils';
import { useRequest } from 'ahooks';
import { UpdateTimeCardReq } from '@/requests';
import { uniq } from 'lodash-es';

interface Props {
  record: Record<string, any>;
  limit: number;
  onOk?: () => void;
}

const COLUMNS = [
  { title: '项目名称', dataIndex: 'projectName' },
  { title: '工作时长', dataIndex: 'duration' },
];

export const SubmitDurationButton = React.memo(({ record, limit, onOk }: Props) => {
  const [form] = Form.useForm();

  const updateTimeCardReq = useRequest(UpdateTimeCardReq, {
    manual: true,
    onSuccess: () => {
      onOk?.();
    },
  });

  const [open, setOpen] = React.useState(false);
  const handleFinish = async (data: Record<string, any>) => {
    const newData = {
      ...data,
    };
    delete newData.isSave;

    // FIXME
    updateTimeCardReq.run({
      ...newData,
    } as any);
    setOpen(false);
  };

  if (record.isSave) {
    return (
      <Table
        bordered
        columns={COLUMNS}
        dataSource={record.data}
        pagination={false}
      />
    );

  }

  const listValidator = React.useMemo(
    () => ({
      validator: (_: unknown, data: any) => {
        const keys = data.map(({ projectName }: any) => projectName);
        if (uniq(keys).length !== keys.length) {
          return Promise.reject(new Error('项目名有重复'));
        }
        if (!limit)
          return Promise.resolve();

        const total = data
          .map(({ duration }: any) => duration || 0)
          .reduce((p: number, c: number) => p + c, 0);

        if (total > limit) {
          return Promise.reject(new Error('总时长超过了最大工时'));
        }
        return Promise.resolve();
      },
    }),
    [],
  );

  return (
    <Popover open={open} content={(
      <div className={'flex items-center'}>
        <Form
          form={form}
          onFinish={handleFinish}
        >
          <Form.List
            name={'data'}
            initialValue={[]}
            rules={[listValidator]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field) => (
                  <Form.Item key={field.key}>
                    <Space>
                      <Form.Item
                        name={[field.name, 'projectName']}
                        noStyle
                        rules={[required()]}
                      >
                        <Input placeholder="项目名称" width={200} />
                      </Form.Item>
                      <Form.Item
                        name={[field.name, 'duration']}
                        noStyle
                        rules={[required()]}
                      >
                        <InputNumber className={'w-100px'} placeholder={'工作时长'}/>
                      </Form.Item>
                      <MinusCircleOutlined
                        className="dynamic-delete-button text-red"
                        onClick={() => remove(field.name)}
                      />
                    </Space>
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add({ projectName: '', duration: 0 })}
                    icon={<PlusOutlined />}
                    className={'w-full'}
                  >
                    Add field
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item noStyle>
            <Button
              loading={updateTimeCardReq.loading}
              className={'w-full mt-5'}
              type={'primary'}
              htmlType={'submit'}
            >
              提报
            </Button>
          </Form.Item>
        </Form>
      </div>
    )}
    >
      <Button onClick={() => setOpen(open => !open)} loading={updateTimeCardReq.loading} size={'small'}>提报</Button>
    </Popover>
  );
});