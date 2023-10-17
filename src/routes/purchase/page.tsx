import React from 'react';
import { useAuth } from '@/hooks';
import { Button, Pagination, Table, Typography } from 'antd';
import { usePagination } from 'ahooks';
import { GetPurchaseOrderReq } from './request';
import { useUserStore } from '@/models';
import { ColumnProps } from 'antd/es/table';
import { PurchaseOrder } from '@/types';
import { PlusSquareOutlined } from '@ant-design/icons';
import { DeletePurchaseOrderButton } from '@/components';

const PurchasePage = React.memo(() => {
  useAuth(['commission']);

  const userModel = useUserStore();
  const { jwt = '' } = userModel.userInfo;
  const pagination = usePagination(({ current, pageSize }) => GetPurchaseOrderReq({
    jwt,
    pageSize,
    pageIndex: current,
  }));

  const handleDelete = () => {
    pagination.refresh();
  };

  const COLUMNS: ColumnProps<PurchaseOrder>[] =
    React.useMemo(
      () => [
        { title: 'ID', dataIndex: 'id' },
        { title: '负责人ID', dataIndex: 'employeeId' },
        { title: '产品', dataIndex: 'productName' },
        { title: '联系电话', dataIndex: 'phone' },
        { title: '住址', dataIndex: 'address' },
        { title: '日期', dataIndex: 'date' },
        { title: '金额', dataIndex: 'pay' },
        { title: '查看', render: (_: unknown, record: PurchaseOrder) => (
          <DeletePurchaseOrderButton
            onDelete={handleDelete}
            id={record.id}
            jwt={jwt}
          />
        ) },
      ],
      [],
    );


  return (
    <>
      <div className={'flex justify-between items-center'}>
        <Typography.Title> 采购订单 </Typography.Title>
        <Button type={'primary'} icon={<PlusSquareOutlined />}>创建订单</Button>
      </div>
      <Pagination
        {...pagination.pagination}
        disabled={pagination.loading}
      />
      <Table
        bordered
        columns={COLUMNS}
        loading={pagination.loading}
        dataSource={pagination.data?.data}
        pagination={false}
      />
    </>
  );
});

export default PurchasePage;