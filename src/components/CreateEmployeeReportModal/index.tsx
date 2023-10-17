import React from 'react';
import { Button, DatePicker, Form, Input, Modal, ModalProps, Select, Table, Typography } from 'antd';
import { downloadHtml2Canvas, required } from '@/utils';
import { CondFormItem } from '@/components';
import { useRequest } from 'ahooks';
import { useUserStore } from '@/models';
import { CreateEmployeeReportReq, GetAvailableTimeCardReq } from './request';
import dayjs from 'dayjs';

interface Props extends ModalProps { }

const TYPE_OPTIONS = [
  { label: '总工时报表', value: 'duration' },
  { label: '项目总工时报表', value: 'proj_duration' },
  { label: '假期/病假', value: 'vacation' },
  { label: '年度总发薪', value: 'salary' },
];

const COLUMNS = [
  { title: '员工ID', dataIndex: 'employeeId' },
  { title: '员工姓名', dataIndex: 'employeeName' },
  // FIXME
  { title: '工时分配', dataIndex: 'data', render: (v: any[]) => {
    return v?.length ? (
      <Table
        bordered
        pagination={false}
        columns={[
          { title: '项目名称', dataIndex: 'projectName' },
          { title: '工作时长', dataIndex: 'duration' },
        ]}
        dataSource={v}
      />
    ) : null;
  } },
  { title: '时长', dataIndex: 'duration' },
  { title: '开始时间', dataIndex: 'startTime' },
  { title: '结束时间', dataIndex: 'endTime' },
  { title: '薪水', dataIndex: 'salary' },
];

const TYPE_MAP: Record<string, string> = {
  duration: '工作总时长',
  proj_duration: '项目总时长',
  vacation: '病假/假期',
  salary: '薪资',
};

const ROLE_MAP: Record<string, string> = {
  employee: 'Employee',
  commission: 'Commission Employee',
  payroll: 'Payroll Administrator',
};

export const CreateEmployeeReportModal = React.memo((props: Props) => {
  const [form] = Form.useForm();
  const getAvailableTimeCardReq = useRequest(GetAvailableTimeCardReq, {
    manual: true,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const { jwt = '' } = useUserStore().userInfo;


  const availableIds = React.useMemo(
    () => {
      return (getAvailableTimeCardReq.data?.data ?? [])
        .map(({ id }: any) => ({ label: id, value: id }));
    },
    [getAvailableTimeCardReq.data],
  );

  const createEmployeeReportReq = useRequest(CreateEmployeeReportReq, {
    manual: true,
  });
  const handleOk = async () => {
    const values = await form.validateFields();
    values.startTime = dayjs(values.startTime).format('YYYY-MM-DD');
    values.endTime = dayjs(values.endTime).format('YYYY-MM-DD');

    createEmployeeReportReq.run(values);
  };

  const saveRef = React.useRef<HTMLDivElement | null>();
  const [reportName, setReportName] = React.useState('');
  const [downloadLoading, setDownloadLoading] = React.useState(false);
  const handleDownload = async () => {
    setDownloadLoading(true);
    try {
      await downloadHtml2Canvas(saveRef.current!, reportName || '报表');
    }
    finally {
      setDownloadLoading(false);
    }
  };

  const userModel = useUserStore();
  const { username  = '', role = '', id = '' } = userModel.userInfo;

  return (
    <Modal
      {...props}
      onOk={handleOk}
      title={'生成员工报告'}
      confirmLoading={createEmployeeReportReq.loading}
      width={900}
    >
      <Form form={form} layout={'vertical'}>
        <Form.Item
          name={'type'}
          label={'报告类型'}
          rules={[required()]}
        >
          <Select
            onChange={(v) => v === 'proj_duration' && getAvailableTimeCardReq.run({ jwt })}
            options={TYPE_OPTIONS}
          />
        </Form.Item>
        <Form.Item
          name={'startTime'}
          label={'开始时间'}
          rules={[required()]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name={'endTime'}
          label={'结束时间'}
          rules={[required()]}
        >
          <DatePicker />
        </Form.Item>
        <CondFormItem
          keys={['type']}
          cond={(type) => type === 'proj_duration'}
          name={'timeCardId'}
          label={'考勤卡ID'}
          rules={[required()]}
        >
          <Select
            placeholder={'选择一个考勤卡'}
            options={availableIds}
            loading={getAvailableTimeCardReq.loading}
          />
        </CondFormItem>
      </Form>
      {createEmployeeReportReq.data && !createEmployeeReportReq.loading ? (
        <>
          <div className={'flex items-center gap-4 mb-3'}>
            <Input placeholder={'你的报告名'} value={reportName} onChange={(e) => setReportName(e.target.value)}/>
            <Button loading={downloadLoading} onClick={handleDownload} icon={<div className={'i-ant-design:download-outlined'}/>}>
              下载报告
            </Button>
          </div>
          <div ref={(el) => saveRef.current = el} className={'px-8 pb-8'}>
            <Typography.Title level={2} className={'text-center'}>
              {TYPE_MAP[form.getFieldValue('type')]}报告
            </Typography.Title>
            <div className={'flex justify-between'}>
              <Typography.Title level={4}>
                {username}({ROLE_MAP[role]}) #{id}
              </Typography.Title>
              <Typography.Title level={4}>
              生成时间：{dayjs().format('YYYY-MM-DD hh:mm:ss')}
              </Typography.Title>
            </div>
            <Table
              bordered
              columns={COLUMNS}
              dataSource={createEmployeeReportReq.data.data}
              pagination={false}
            />
          </div>
        </>
      ) : null}
    </Modal>
  );
});