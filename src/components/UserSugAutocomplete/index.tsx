import React from 'react';
import { AutoComplete, AutoCompleteProps } from 'antd';
import { useRequest } from 'ahooks';
import { UserSugReq } from './request';
import { debounce } from 'lodash-es';
import { useUserStore } from '@/models';

interface Props extends AutoCompleteProps {}

export const UserSugAutoComplete = React.memo((props: Props) => {
  const userSugReq = useRequest(UserSugReq, {
    manual: true,
  });

  const { jwt = '' } = useUserStore().userInfo;
  const handleSearch = debounce((id) => userSugReq.run({ id, jwt }), 200);

  const sugs = (userSugReq.data?.data ?? []).map((value: string) => ({ value }));

  return (
    // <Input {...props} />
    <AutoComplete
      {...props}
      onSearch={handleSearch}
      options={sugs}
    />
  );
});