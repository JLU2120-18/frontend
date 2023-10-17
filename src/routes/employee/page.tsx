import React from 'react';
import { useAuth } from '@/hooks';
import { Button, Input, message, Pagination, Table, Typography } from 'antd';
import { usePagination } from 'ahooks';
import { GetEmployeeReq } from './request';
import { useUserStore } from '@/models';
import { ColumnProps } from 'antd/es/table';
import { EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import {
  CreateEmployeeModal,
  DeleteEmployeeButton,
  EditEmployeeModal,
} from '@/components';
import { Employee } from '@/types';

const EmployeesPage = React.memo(() => {
  useAuth(['payroll']);

  const userModel = useUserStore();
  const { jwt = '' } = userModel.userInfo;
  const [searchV, setSearchV] = React.useState('');
  const pagination = usePagination(
    ({ current, pageSize }) => GetEmployeeReq({
      id: searchV,
      jwt,
      pageSize,
      pageIndex: current,
    }),
  );

  const handleDelete = () => {
    pagination.refresh();
  };

  const [record, setRecord] = React.useState<Employee>();
  const [editOpen, setEditOpen] = React.useState(false);
  const COLUMNS: ColumnProps<Employee>[] =
    React.useMemo(
      () => [
        { title: 'ID', dataIndex: 'id' },
        { title: '员工姓名', dataIndex: 'username' },
        { title: '查看', render: (_: unknown, record: Employee) => (
          <div className={'flex gap-3'}>
            <Button
              size={'small'}
              icon={<EditOutlined />}
              onClick={() => {
                setRecord(record);
                setEditOpen(true);
              }}
            />
            <DeleteEmployeeButton
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
    message.success(`创建员工成功：${id}`);
    setCreateOpen(false);
    pagination.refresh();
  };

  return (
    <>
      <div className={'flex justify-between items-center'}>
        <Typography.Title> 员工管理 </Typography.Title>
        <Button
          type={'primary'}
          icon={<PlusSquareOutlined />}
          onClick={() => setCreateOpen(true)}
        >
          创建员工
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
      <EditEmployeeModal
        record={record}
        open={editOpen}
        onOk={handleEditOk}
        onCancel={() => setEditOpen(false)}
      />
      <CreateEmployeeModal
        open={createOpen}
        onCreateOk={handleCreateOk}
        onCancel={() => setCreateOpen(false)}
      />
    </>
  );
});

export default EmployeesPage;