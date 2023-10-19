import React from 'react';
import { Avatar, Layout, Menu, theme, Typography } from 'antd';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useUserStore } from '@/models';

const { Header, Content, Sider } = Layout;

function item(
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode,
  children?: any[],
) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const AppLayout = React.memo(() => {
  const [collapsed, setCollapsed] = React.useState(false);
  const handleClick = React.useCallback(
    (obj: {key: string}) => {
      navigate(obj.key);
    },
    [],
  );

  const navigate = useNavigate();

  const { token:{ colorBgContainer } } = theme.useToken();

  const location = useLocation();
  const userModel = useUserStore();
  const { role } = userModel.userInfo;

  const items = React.useMemo(
    () => {
      switch (role) {
      case 'employee':
        return [
          item('主页', '/'),
          item('考勤卡', '/timecard'),
          item('退出','/logout'),
        ];
      case 'commission':
        return [
          item('主页', '/'),
          item('采购订单', '/purchase'),
          item('退出','/logout'),
        ];
      case 'payroll':
        return [
          item('主页', '/'),
          item('员工管理', '/employee'),
          item('退出','/logout'),
        ];
      }
      return [];
    },
    [role],
  );

  const defaultKey = React.useMemo(
    () => {
      return items
        .map(item => item!.key)
        .filter((key) => location.pathname.startsWith(key))
        .sort((a, b) => b.length - a.length)[0] ?? '';
    },
    [location.pathname],
  );

  const { username } = userModel.userInfo;

  return (
    <Layout className={'min-h-screen'}>
      <Sider
        className={'min-h-screen flex flex-col'}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ backgroundColor: colorBgContainer }}
      >
        <div className={'h-100px w-full p-5 px-4 flex justify-between items-center text-blue-7'}>
          <div className={'i-ant-design:account-book-filled text-30px'}/>
          <Typography.Text className={'text-20px text-blue-7'}>Prophet Salary</Typography.Text>
        </div>
        <Menu
          className={'min-w-full flex-1'}
          onClick={handleClick}
          defaultSelectedKeys={[defaultKey]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className={'flex flex-col max-h-screen'}>
        <Header className={'p0 h-60px'} style={{ backgroundColor: colorBgContainer }}>
          <div className={'h-full flex justify-end items-center px-10 gap-3'}>
            <Avatar shape={'square'} size={'large'}>
              {username?.[0].toUpperCase()}
            </Avatar>
            <Typography.Text>{username}</Typography.Text>
          </div>
        </Header>
        <Content className={'my-0 mx-16px overflow-auto flex-1'}>
          <Outlet/>
        </Content>
        {/*<Footer className={'text-center'}>Ant Design ©2023 Created by Ant UED</Footer>*/}
      </Layout>
    </Layout>
  );
});

export default AppLayout;