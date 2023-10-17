import React from 'react';
import { AutoComplete, AutoCompleteProps } from 'antd';
import { useRequest } from 'ahooks';
import { UserSugReq } from '@/components/UserSugAutocomplete/request.ts';
import { debounce } from 'lodash-es';

interface Props extends AutoCompleteProps {}
// interface Props extends InputProps {}

export const UserSugAutoComplete = React.memo((props: Props) => {
  const userSugReq = useRequest(UserSugReq, {
    manual: true,
  });

  const handleSearch = debounce((id) => userSugReq.run({ id }), 200);

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