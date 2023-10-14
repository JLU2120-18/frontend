import React from 'react';
import { Button, Space, DatePicker, Typography } from 'antd';

const AppPage = React.memo(() => (
  <>
    <Typography.Title>
      Prophet Salary Manage System
    </Typography.Title>
    <Space>
      <DatePicker />
      <Button type="primary">Primary Button</Button>
    </Space>
  </>
));

export default AppPage;