import React from 'react';
import { Button, message, Popover } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { DeletePurchaseReq } from '@/requests/purchase';

interface Props {
  id: string;
  jwt: string;
  onDelete?: (id: string) => void;
}

export const DeletePurchaseOrderButton = React.memo((props: Props) => {
  const { id, jwt, onDelete } = props;

  const deletePurchaseOrderReq = useRequest(DeletePurchaseReq, {
    manual: true,
    onSuccess: () => {
      message.success('删除成功');
      onDelete?.(id);
    },
  });

  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
    deletePurchaseOrderReq.run({ jwt, id });
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
        loading={deletePurchaseOrderReq.loading}
      />
    </Popover>

  );
});