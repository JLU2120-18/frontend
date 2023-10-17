import React from 'react';
import { Button, message, Popover } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { DeletePurchaseReq } from '@/requests/purchase.ts';

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
    <div className={'flex gap-3'}>
      <Button size={'small'} icon={<EyeOutlined />} />
      <Button size={'small'} icon={<EditOutlined />} />
      <Popover
        open={open}
        content={(
          <Button
            type={'primary'}
            danger
            onClick={() => handleDelete()}
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
    </div>
  );
});