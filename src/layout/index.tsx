import React from 'react';
import { Avatar, Layout, Menu, theme, Typography } from 'antd';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useUserStore } from '@/models';

const { Header, Content, Footer, Sider } = Layout;

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

// const items: MenuItem[] = [
//   item('Option 1', '1', <PieChartOutlined />),
//   item('Option 2', '2', <DesktopOutlined />),
//   item('User', 'sub1', <UserOutlined />, [
//     item('Tom', '3'),
//     item('Bill', '4'),
//     item('Alex', '5'),
//   ]),
//   item('Team', 'sub2', <TeamOutlined />, [item('Team 1', '6'), item('Team 2', '8')]),
//   item('Files', '9', <FileOutlined />),
// ];

const items = [
  item('主页', '/'),
  item('退出登录', '/logout'),
];

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

  const defaultKey = React.useMemo(
    () => {
      return items
        .map(item => item!.key)
        .filter((key) => location.pathname.startsWith(key))
        .sort((a, b) => b.length - a.length)[0] ?? '';
    },
    [],
  );

  const userModel = useUserStore();
  const { username, avatar } = userModel.userInfo;

  return (
    <Layout className={'min-h-screen'}>
      <Sider
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ backgroundColor: colorBgContainer }}
      >
        <Menu
          className={'min-w-full min-h-screen'}
          onClick={handleClick}
          defaultSelectedKeys={[defaultKey]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header className={'p0'} style={{ backgroundColor: colorBgContainer }}>
          <div className={'h-full flex justify-end items-center px-10 gap-3'}>
            <Avatar shape={'square'} src={avatar} size={'large'}/>
            <Typography.Text>{username}</Typography.Text>
          </div>
        </Header>
        <Content className={'my-0 mx-16px'}>
          <Outlet/>
        </Content>
        <Footer className={'text-center'}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
});

export default AppLayout;