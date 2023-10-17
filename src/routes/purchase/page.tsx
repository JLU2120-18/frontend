import React from 'react';
import { useAuth } from '@/hooks';
import { Button, Input, message, Pagination, Table, Typography } from 'antd';
import { usePagination } from 'ahooks';
import { GetPurchaseOrderReq } from './request';
import { useUserStore } from '@/models';
import { ColumnProps } from 'antd/es/table';
import { PurchaseOrder } from '@/types';
import { EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { CreatePurchaseOrderModal, DeletePurchaseOrderButton, EditPurchaseOrderModal } from '@/components';

const PurchasePage = React.memo(() => {
  useAuth(['commission']);

  const userModel = useUserStore();
  const { jwt = '' } = userModel.userInfo;
  const [searchV, setSearchV] = React.useState('');
  const pagination = usePagination(
    ({ current, pageSize }) => GetPurchaseOrderReq({
      id: searchV,
      jwt,
      pageSize,
      pageIndex: current,
    }),
  );

  const handleDelete = () => {
    pagination.refresh();
  };

  const [record, setRecord] = React.useState<PurchaseOrder>();
  const [editOpen, setEditOpen] = React.useState(false);
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
          <div className={'flex gap-3'}>
            <Button
              size={'small'}
              icon={<EditOutlined />}
              onClick={() => {
                setRecord(record);
                setEditOpen(true);
              }}
            />
            <DeletePurchaseOrderButton
              onDelete={handleDelete}
              id={record.id}
              jwt={jwt}
            />
          </div>
        ) },
      ],
      [],
    );

  const handleEditOk = () => {
    setEditOpen(false);
    message.success('编辑成功');
    pagination.refresh();
  };

  const [createOpen, setCreateOpen] = React.useState(false);
  const handleCreateOk = (id: string) => {
    message.success(`创建采购订单成功：${id}`);
    setCreateOpen(false);
    pagination.refresh();
  };

  return (
    <>
      <div className={'flex justify-between items-center'}>
        <Typography.Title> 采购订单 </Typography.Title>
        <Button
          type={'primary'}
          icon={<PlusSquareOutlined />}
          onClick={() => setCreateOpen(true)}
        >
          创建订单
        </Button>
      </div>
      <div className={'flex justify-between'}>
        <div className={'w-500px mb-5'}>
          <Input.Search
            className={'w-full'}
            onSearch={pagination.refresh}
            value={searchV}
            onChange={e => setSearchV(e.target.value)}
          />
        </div>
        <Pagination
          {...pagination.pagination}
          disabled={pagination.loading}
        />
      </div>
      <Table
        bordered
        columns={COLUMNS}
        loading={pagination.loading}
        dataSource={pagination.data?.data}
        pagination={false}
      />
      <EditPurchaseOrderModal
        record={record}
        open={editOpen}
        onOk={handleEditOk}
        onCancel={() => setEditOpen(false)}
      />
      <CreatePurchaseOrderModal
        open={createOpen}
        onCreateOk={handleCreateOk}
        onCancel={() => setCreateOpen(false)}
      />
    </>
  );
});

export default PurchasePage;