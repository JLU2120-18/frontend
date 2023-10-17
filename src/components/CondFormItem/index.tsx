import React from 'react';
import { Form, FormItemProps } from 'antd';
import { get } from 'lodash-es';

interface Props extends FormItemProps{
  keys: string[];
  cond: (...args: any[]) => boolean;
}

export const CondFormItem = React.memo((props: Props) => {
  const { keys, cond } = props;

  return (
    <Form.Item
      noStyle
      shouldUpdate={(p, c) => !keys.every(key => get(p, key) === get(c, key))}
    >
      {({ getFieldValue }) => cond(...keys.map(key => getFieldValue(key))) ? (
        <Form.Item
          {...props}
        />
      ) : null}
    </Form.Item>
  );
});