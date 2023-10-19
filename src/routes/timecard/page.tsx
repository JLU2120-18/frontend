import React from 'react';
import { Divider, message, Pagination, Table, Typography } from 'antd';
import { usePagination } from 'ahooks';
import { GetTimeCardReq } from '@/requests';
import { SubmitDurationButton } from '@/components';
import { useUserStore } from '@/models';
import { useAuth } from '@/hooks';
import { useNavigate } from 'react-router-dom';

const TimeCardPage = React.memo(() => {
  useAuth(['employee', 'commission']);

  const userModel = useUserStore();
  const { duration_limit: limit } = userModel.businessInfo;
  const navigate = useNavigate();
  const pagination = usePagination(({ current, pageSize }) => GetTimeCardReq({ pageIndex: current, pageSize, jwt }), {
    onError: () => {
      message.error('身份信息过期，获取失败，请重新登陆');
      navigate('/login');
    },
  });
  const handleOk = () => {
    message.success('提报成功');
    pagination.refresh();
  };

  const COLUMNS = React.useMemo(
    () => [
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: '状态', dataIndex: 'isSave', key: 'isSave', render: (v: boolean) => (
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
      { title: '工时分配', dataIndex: 'data',
        render: (_: any, record: Record<string, any>) => (
          <SubmitDurationButton
            onOk={handleOk}
            record={record}
            limit={limit}
          />
        ),
      },
      { title: '开始时间', dataIndex: 'startTime', key: 'startTime' },
      { title: '结束时间', dataIndex: 'endTime', key: 'endTime' },
    ],
    [limit],
  );

  const { jwt = '' } = userModel.userInfo;

  return (
    <>
      <Typography.Title>考勤卡</Typography.Title>
      <Divider>所有考勤</Divider>
      <Pagination
        {...pagination.pagination}
        disabled={pagination.loading}
      />
      <Table
        bordered
        columns={COLUMNS}
        dataSource={pagination.data?.data}
        loading={pagination.loading}
        pagination={false}
      />
    </>
  );
});

export default TimeCardPage;