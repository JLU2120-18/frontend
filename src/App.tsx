import React from 'react';
import { Button, Space, DatePicker, Typography } from 'antd';

const App = React.memo(() => (
  <div
    p={'3'}
    m={'12'}
  >
    <Typography.Title>
      Prophet Salary Manage System
    </Typography.Title>
    <Space>
      <DatePicker />
      <Button type="primary">Primary Button</Button>
    </Space>
  </div>
));

export default App;