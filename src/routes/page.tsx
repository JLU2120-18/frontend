import React from 'react';
import { Divider, Table, TableProps, Typography } from 'antd';
import { useUserStore } from '@/models';
import { useRequest } from 'ahooks';
import { GetUserInfoReq } from '@/requests';
import { ColumnsType } from 'antd/es/table';
import { BaseDataType, BusinessDataType, SocietyDataType } from '@/routes/type.ts';

const AppPage = React.memo(() => {
  const userModel  = useUserStore();
  const { username, role, jwt }  = userModel.userInfo;

  const displayRole = React.useMemo(
    () => role === 'employee' ? 'Employee'
      :role === 'commission' ? 'Commission Employee'
        :role === 'payroll' ? 'Payroll Administrator'
          : 'Unknown',
    [role],
  );

  const getUserInfoReq = useRequest(GetUserInfoReq, {
    defaultParams: [{ jwt: jwt ?? '' }],
  });

  const BASE_COLUMN = React.useMemo(
    () => {
      const columns: ColumnsType<BaseDataType> = [
        { title: 'ID', dataIndex: 'id' },
        { title: '姓名', dataIndex: 'username' },
        { title: '住址', dataIndex: 'address' },
        { title: '电话', dataIndex: 'phone' },
      ];
      return columns;
    },
    [],
  );

  const SOCIETY_COLUMN = React.useMemo(
    () => {
      const columns: ColumnsType<SocietyDataType> = [
        { title: '社保卡', dataIndex: 'socsec_id' },
        { title: '税率(%)', dataIndex: 'tax_rate' },
        { title: '其他费用(元)', dataIndex: 'other_cast' },
      ];
      return columns;
    },
    [],
  );

  const BUSINESS_COLUMN = React.useMemo(
    () => {
      if (!getUserInfoReq.data) return [];
      const { type } = getUserInfoReq.data;
      const columns: ColumnsType<BusinessDataType> = [
        { title: '发薪类型', dataIndex: 'type', render: (v) =>
          v === 'salary' ? '月薪'
            :v === 'wage' ? '时薪'
              : v === 'commission' ? '佣金' : 'UNKNOWN' },

        { title: '发薪方式', dataIndex: 'payment', render: (v) =>
          v === 'receive' ? '领取'
            : v === 'bank' ? '银行付款'
              : v === 'mail' ? '邮件' : 'UNKNONW',
        },
        { title: '工时限制/时', dataIndex: 'duration_limit' },
      ];
      switch (type) {
      case 'salary': columns.push({ title: '工资(元/月)', dataIndex: 'salary' });
        break;
      case 'wage': columns.push({ title: '时薪(元/时)', dataIndex: 'hour_wage' });
        break;
      case 'commission': columns.push({ title:'佣金率(%)', dataIndex: 'commission_rate' });
        break;
      }
      return columns;
    },
    [getUserInfoReq.data?.type],
  );

  const OTHER_COLUMN = React.useMemo(
    () => {
      if (!getUserInfoReq.data) return [];
      const { payment } = getUserInfoReq.data;
      switch (payment) {
      case 'mail':
        return [{ title: '邮件地址', dataIndex: 'mail_address' }];
      case 'bank':
        return [
          { title: '银行名称', dataIndex: 'bank_name' },
          { title: '银行账户', dataIndex: 'bank_account' },
        ];
      }
      return [];
    },
    [getUserInfoReq.data?.payment],
  );

  const dataSource = React.useMemo(
    () => getUserInfoReq.data ? [getUserInfoReq.data] : [],
    [getUserInfoReq.data],
  );

  React.useEffect(
    () => {
      console.log(dataSource);
    },
    [dataSource],
  );

  const CommonTable = React.useCallback(
    (props: TableProps<any>) => (
      <Table
        {...props}
        loading={getUserInfoReq.loading}
        dataSource={dataSource}
        pagination={false}
      />
    ),
    [getUserInfoReq.loading, dataSource],
  );

  const roleColor = React.useMemo(
    () => role === 'employee' ? 'text-green'
      : role === 'commission' ? 'text-blue'
        :role === 'payroll' ? 'text-origin' : 'text-black',
    [],
  );

  return (
    <>
      <Typography.Title>
        <Typography.Text className={'text-3xl'}>{username}</Typography.Text>
        <Typography.Text className={'text-2xl ml-1xl ' + roleColor}>{displayRole}</Typography.Text>
        <Typography.Text className={'text-2xl ml-5xl'}>
          您好，您的个人信息如下：
        </Typography.Text>
      </Typography.Title>
      <Divider>基本信息</Divider>
      <CommonTable columns={BASE_COLUMN} />

      <Divider>社会信息</Divider>
      <CommonTable columns={SOCIETY_COLUMN} />

      <Divider>工作信息</Divider>
      <CommonTable columns={BUSINESS_COLUMN} />

      {OTHER_COLUMN.length ? (
        <>
          <Divider>额外信息</Divider>
          <CommonTable columns={OTHER_COLUMN}/>
        </>
      ) : null}
    </>
  );
});

export default AppPage;

