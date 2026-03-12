import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Avatar, Dropdown, Input, Badge } from 'antd';
import {
  DashboardOutlined,
  TicketOutlined,
  UserOutlined,
  ShoppingOutlined,
  SettingOutlined,
  MonitorOutlined,
  FundOutlined,
  BellOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { Search } = Input;

const BasicLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 根据用户提供的菜单图片定义导航结构
  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '工作台',
    },
    {
      key: '/ticket',
      icon: <TicketOutlined />,
      label: '票务管理',
      children: [
        { key: '/ticket/sell', label: '快速售票' },
        { key: '/ticket/query', label: '票务查询' },
        { key: '/ticket/refund', label: '退票处理' },
        { key: '/ticket/statistics', label: '票务统计' },
        { key: '/ticket/package', label: '套餐设置' },
      ],
    },
    {
      key: '/member',
      icon: <UserOutlined />,
      label: '会员管理',
      children: [
        { key: '/member/archive', label: '会员档案' },
        { key: '/member/points', label: '积分管理' },
        { key: '/member/marketing', label: '会员营销' },
        { key: '/member/records', label: '消费记录' },
        { key: '/member/analysis', label: '会员分析' },
      ],
    },
    {
      key: '/product',
      icon: <ShoppingOutlined />,
      label: '商品管理',
      children: [
        { key: '/product/list', label: '商品列表' },
        { key: '/product/inventory', label: '库存管理' },
        { key: '/product/purchase', label: '采购管理' },
        { key: '/product/sales', label: '销售统计' },
        { key: '/product/category', label: '商品分类' },
      ],
    },
    {
      key: '/device',
      icon: <MonitorOutlined />,
      label: '设备管理',
      children: [
        { key: '/device/monitor', label: '设备监控' },
        { key: '/device/maintenance', label: '维护记录' },
        { key: '/device/alarm', label: '报警管理' },
        { key: '/device/archive', label: '设备档案' },
        { key: '/device/statistics', label: '运行统计' },
      ],
    },
    {
      key: '/finance',
      icon: <FundOutlined />,
      label: '财务管理',
      children: [
        { key: '/finance/income-expense', label: '日常收支' },
        { key: '/finance/reconciliation', label: '对账管理' },
        { key: '/finance/reports', label: '财务报表' },
        { key: '/finance/invoice', label: '发票管理' },
        { key: '/finance/cash-flow', label: '资金流水' },
      ],
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
  ];

  // 面包屑映射
  const breadcrumbNameMap: Record<string, string> = {
    '/dashboard': '工作台',
    '/ticket': '票务管理',
    '/ticket/sell': '快速售票',
    '/ticket/query': '票务查询',
    '/ticket/refund': '退票处理',
    '/ticket/statistics': '票务统计',
    '/ticket/package': '套餐设置',
    '/member': '会员管理',
    '/member/archive': '会员档案',
    '/member/points': '积分管理',
    '/member/marketing': '会员营销',
    '/member/records': '消费记录',
    '/member/analysis': '会员分析',
    '/product': '商品管理',
    '/device': '设备管理',
    '/finance': '财务管理',
    '/settings': '系统设置',
  };

  // 生成面包屑
  const getBreadcrumbItems = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    const items = [{ title: '首页' }];
    
    let currentPath = '';
    paths.forEach((path) => {
      currentPath += `/${path}`;
      if (breadcrumbNameMap[currentPath]) {
        items.push({ title: breadcrumbNameMap[currentPath] });
      }
    });
    
    return items;
  };

  const userMenuItems = [
    { key: 'profile', label: '个人中心' },
    { key: 'settings', label: '设置' },
    { type: 'divider' },
    { key: 'logout', label: '退出登录' },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        width={240}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          background: '#001529',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ padding: '16px', textAlign: 'center' }}
        >
          {!collapsed ? (
            <div style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
              游乐场管理系统
            </div>
          ) : (
            <div style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>
              游乐场
            </div>
          )}
        </motion.div>
        
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          defaultOpenKeys={menuItems.map(item => item.key)}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ borderRight: 0 }}
        />
      </Sider>
      
      <Layout style={{ marginLeft: collapsed ? 80 : 240, transition: 'margin-left 0.2s' }}>
        <Header style={{ 
          padding: '0 24px', 
          background: 'white', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
              style: { fontSize: '18px', cursor: 'pointer' },
            })}
            
            <Search
              placeholder="搜索功能、订单、会员..."
              prefix={<SearchOutlined />}
              style={{ width: 300 }}
              allowClear
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <Badge count={5} size="small">
              <BellOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
            </Badge>
            
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <Avatar 
                  size="default" 
                  src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg" 
                />
                <div>
                  <div style={{ fontWeight: '500' }}>管理员</div>
                  <div style={{ fontSize: '12px', color: '#999' }}>深圳欢乐谷</div>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>
        
        <Content style={{ margin: '24px 16px', padding: 24, background: '#f0f2f5', minHeight: 280 }}>
          <Breadcrumb items={getBreadcrumbItems()} style={{ marginBottom: 16 }} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;