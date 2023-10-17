import React from 'react';
import { Button, message, Popover } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { DeleteEmployeeReq } from './request';

interface Props {
  id: string;
  jwt: string;
  onDelete?: (id: string) => void;
}

export const DeleteEmployeeButton = React.memo((props: Props) => {
  const { id, jwt, onDelete } = props;

  const deleteEmployeeReq = useRequest(DeleteEmployeeReq, {
    manual: true,
    onSuccess: () => {
      message.success('删除成功');
      onDelete?.(id);
    },
  });

  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
    deleteEmployeeReq.run({ jwt, id });
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      content={(
        <Button
          type={'primary'}
          danger
          onClick={handleDelete}
        >
          确认删除
        </Button>
      )}
    >
      <Button
        danger
        size={'small'}
        icon={<DeleteOutlined style={{ color: 'red' }}/>}
        onClick={() => setOpen(open => !open)}
        loading={deleteEmployeeReq.loading}
      />
    </Popover>

  );
});