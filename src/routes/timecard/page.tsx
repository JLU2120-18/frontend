import React from 'react';
import { Divider, message, Pagination, Table, Typography } from 'antd';
import { usePagination, useRequest } from 'ahooks';
import { GetTimeCardReq, SubmitTimeCardReq } from '@/requests';
import { SubmitDurationButton } from '@/components';
import { useUserStore } from '@/models';
import { useAuth } from '@/hooks';

const TimeCardPage = React.memo(() => {
  useAuth(['employee', 'commission']);
  const submitTimeCardReq = useRequest(SubmitTimeCardReq, {
    manual: true,
    onSuccess: () => {
      message.success('提报考勤卡成功');
      pagination.refresh();
    },
    onError: (message: RequestHeadersMessage) => {
      message.error('提报考勤卡失败，' + message);
    },
  });

  const handleSubmit = (values: Record<string, any>) => {
    submitTimeCardReq.run({
      id: values.id,
      duration: values.duration,
      jwt,
    });
  };

  const COLUMNS = React.useMemo(
    () => [
      { title: 'ID', dataIndex: 'id' },
      { title: '状态', dataIndex: 'is_save', render: (v: boolean) => (
        <div className={'flex items-center gap-2'}>
          {v ? (
            <>
              <div className={'i-ant-design:check-circle-filled text-green'}/>
              已提交
            </>
          ) : (
            <>
              <div className={'i-ant-design:exclamation-circle-filled text-yellow'}/>
              未提交
            </>
          )}
        </div>
      ) },
      { title: '工时', dataIndex: 'duration', render: (v: number, record) => (
        <SubmitDurationButton
          onSubmit={handleSubmit}
          loading={submitTimeCardReq.loading}
          v={v}
          record={record}
        />
      ) },
      { title: '开始时间', dataIndex: 'start_time' },
      { title: '结束时间', dataIndex: 'end_time' },
    ],
    [submitTimeCardReq.loading, handleSubmit],
  );

  const userModel = useUserStore();
  const { jwt } = userModel.userInfo;
  const pagination = usePagination((params) => GetTimeCardReq({ ...params, jwt }));

  return (
    <>
      <Typography.Title>考勤卡</Typography.Title>
      <Divider>所有考勤</Divider>
      <Pagination
        total={pagination.data?.total}
        {...pagination.pagination}
        disabled={pagination.loading}
      />
      <Table
        columns={COLUMNS}
        dataSource={pagination.data?.list}
        loading={pagination.loading}
        pagination={false}
      />
    </>
  );
});

export default TimeCardPage;