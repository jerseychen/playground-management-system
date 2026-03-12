import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Menu, Badge, Avatar, Dropdown, Button, Tabs, message } from 'antd';
import { 
  HomeOutlined, 
  ShoppingCartOutlined, 
  ShoppingOutlined, 
  GiftOutlined,
  UserOutlined,
  BarChartOutlined,
  SettingOutlined,
  AppstoreOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  ExportOutlined,
  MoreOutlined,
  DownOutlined,
  ReloadOutlined,
  CloseOutlined,
  ShopOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

// 标签页项接口
interface TabItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  closable?: boolean;
}

// 路由映射表
const routeMap: Record<string, { label: string; icon?: React.ReactNode }> = {
  '/dashboard': { label: '首页', icon: <HomeOutlined /> },
  '/ticket/sale': { label: '售票', icon: <ShoppingCartOutlined /> },
  '/ticket/query': { label: '票务查询', icon: <SearchOutlined /> },
  '/ticket/package': { label: '套票管理', icon: <GiftOutlined /> },
  '/ticket/stats': { label: '票务统计', icon: <BarChartOutlined /> },
  '/member/list': { label: '会员列表', icon: <UserOutlined /> },
  '/member/points': { label: '积分管理', icon: <GiftOutlined /> },
  '/member/marketing': { label: '会员营销', icon: <GiftOutlined /> },
  '/member/analysis': { label: '会员分析', icon: <BarChartOutlined /> },
  '/product/list': { label: '商品列表', icon: <ShoppingOutlined /> },
  '/product/inventory': { label: '库存管理', icon: <AppstoreOutlined /> },
  '/product/purchase': { label: '采购管理', icon: <ShoppingCartOutlined /> },
  '/device/monitor': { label: '设备监控', icon: <AppstoreOutlined /> },
  '/device/maintenance': { label: '设备维护', icon: <SettingOutlined /> },
  '/device/alert': { label: '报警管理', icon: <BellOutlined /> },
  '/finance/daily': { label: '营业日报', icon: <BarChartOutlined /> },
  '/finance/reconciliation': { label: '财务对账', icon: <ShoppingCartOutlined /> },
  '/finance/reports': { label: '财务报表', icon: <BarChartOutlined /> },
  '/settings/basic': { label: '基础设置', icon: <SettingOutlined /> },
  '/settings/permission': { label: '权限管理', icon: <UserOutlined /> },
};

// 获取路由信息
const getRouteInfo = (path: string): { label: string; icon?: React.ReactNode } => {
  if (routeMap[path]) {
    return routeMap[path];
  }
  // 尝试匹配父路径
  const parts = path.split('/').filter(Boolean);
  for (let i = parts.length; i > 0; i--) {
    const parentPath = '/' + parts.slice(0, i).join('/');
    if (routeMap[parentPath]) {
      return routeMap[parentPath];
    }
  }
  return { label: '未命名页面', icon: <HomeOutlined /> };
};

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  // 标签页状态
  const [tabs, setTabs] = useState<TabItem[]>([
    { key: '/dashboard', label: '首页', icon: <HomeOutlined />, closable: false }
  ]);
  const [activeKey, setActiveKey] = useState('/dashboard');

  // 监听路由变化，自动添加标签页
  useEffect(() => {
    const currentPath = location.pathname;
    setActiveKey(currentPath);

    // 检查是否已存在该标签
    const existingTab = tabs.find(tab => tab.key === currentPath);
    if (!existingTab && currentPath !== '/') {
      const routeInfo = getRouteInfo(currentPath);
      const newTab: TabItem = {
        key: currentPath,
        label: routeInfo.label,
        icon: routeInfo.icon,
        closable: true,
      };
      setTabs(prev => [...prev, newTab]);
    }
  }, [location.pathname]);

  // 切换标签页
  const handleTabChange = (key: string) => {
    navigate(key);
  };

  // 关闭标签页
  const handleTabClose = (targetKey: string) => {
    const targetIndex = tabs.findIndex(tab => tab.key === targetKey);
    const newTabs = tabs.filter(tab => tab.key !== targetKey);
    
    // 如果关闭的是当前标签，切换到相邻标签
    if (targetKey === activeKey && newTabs.length > 0) {
      const newActiveKey = newTabs[Math.min(targetIndex, newTabs.length - 1)].key;
      navigate(newActiveKey);
    }
    
    setTabs(newTabs);
  };

  // 关闭其他标签页
  const handleCloseOthers = () => {
    const homeTab = tabs.find(tab => tab.key === '/dashboard');
    const currentTab = tabs.find(tab => tab.key === activeKey);
    
    if (homeTab && currentTab) {
      if (activeKey === '/dashboard') {
        setTabs([homeTab]);
      } else {
        setTabs([homeTab, { ...currentTab, closable: true }]);
      }
    }
  };

  // 关闭所有标签页
  const handleCloseAll = () => {
    const homeTab = tabs.find(tab => tab.key === '/dashboard');
    if (homeTab) {
      setTabs([homeTab]);
      navigate('/dashboard');
    }
  };

  // 刷新当前页面
  const handleRefresh = () => {
    window.location.reload();
  };

  // 用户菜单
  const userMenuItems = [
    { key: 'profile', label: '个人中心' },
    { key: 'settings', label: '账号设置' },
    { type: 'divider' as const },
    { key: 'logout', label: '退出登录' }
  ];

  // 菜单点击处理
  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  // 菜单项配置
  const menuItems: MenuItem[] = [
    {
      key: 'dashboard',
      icon: <HomeOutlined />,
      label: '首页',
      onClick: () => handleMenuClick('/dashboard')
    },
    {
      key: 'ticket',
      icon: <ShoppingCartOutlined />,
      label: '票务管理',
      children: [
        { key: 'ticket-sale', label: '售票', onClick: () => handleMenuClick('/ticket/sale') },
        { key: 'ticket-query', label: '票务查询', onClick: () => handleMenuClick('/ticket/query') },
        { key: 'ticket-package', label: '套票管理', onClick: () => handleMenuClick('/ticket/package') },
        { key: 'ticket-stats', label: '票务统计', onClick: () => handleMenuClick('/ticket/stats') },
      ]
    },
    {
      key: 'member',
      icon: <UserOutlined />,
      label: '会员管理',
      children: [
        { key: 'member-list', label: '会员列表', onClick: () => handleMenuClick('/member/list') },
        { key: 'member-points', label: '积分管理', onClick: () => handleMenuClick('/member/points') },
        { key: 'member-marketing', label: '会员营销', onClick: () => handleMenuClick('/member/marketing') },
        { key: 'member-analysis', label: '会员分析', onClick: () => handleMenuClick('/member/analysis') },
      ]
    },
    {
      key: 'product',
      icon: <ShoppingOutlined />,
      label: '商品管理',
      children: [
        { key: 'product-list', label: '商品列表', onClick: () => handleMenuClick('/product/list') },
        { key: 'product-inventory', label: '库存管理', onClick: () => handleMenuClick('/product/inventory') },
        { key: 'product-purchase', label: '采购管理', onClick: () => handleMenuClick('/product/purchase') },
      ]
    },
    {
      key: 'device',
      icon: <AppstoreOutlined />,
      label: '设备管理',
      children: [
        { key: 'device-monitor', label: '设备监控', onClick: () => handleMenuClick('/device/monitor') },
        { key: 'device-maintenance', label: '设备维护', onClick: () => handleMenuClick('/device/maintenance') },
        { key: 'device-alert', label: '报警管理', onClick: () => handleMenuClick('/device/alert') },
      ]
    },
    {
      key: 'finance',
      icon: <BarChartOutlined />,
      label: '财务管理',
      children: [
        { key: 'finance-daily', label: '营业日报', onClick: () => handleMenuClick('/finance/daily') },
        { key: 'finance-reconciliation', label: '财务对账', onClick: () => handleMenuClick('/finance/reconciliation') },
        { key: 'finance-reports', label: '财务报表', onClick: () => handleMenuClick('/finance/reports') },
      ]
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '系统设置',
      children: [
        { key: 'settings-basic', label: '基础设置', onClick: () => handleMenuClick('/settings/basic') },
        { key: 'settings-permission', label: '权限管理', onClick: () => handleMenuClick('/settings/permission') },
      ]
    },
  ];

  // 获取当前选中的菜单key
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return ['dashboard'];
    const parts = path.split('/');
    if (parts.length >= 2) return [parts[1]];
    return ['dashboard'];
  };

  // 标签页右键菜单
  const tabBarExtraContent = {
    right: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingRight: 16 }}>
        <Button 
          type="text" 
          size="small" 
          icon={<ReloadOutlined />}
          onClick={handleRefresh}
        >
          刷新
        </Button>
        <Dropdown
          menu={{
            items: [
              { key: 'closeOthers', label: '关闭其他', onClick: handleCloseOthers },
              { key: 'closeAll', label: '关闭全部', onClick: handleCloseAll },
            ]
          }}
          placement="bottomRight"
        >
          <Button type="text" size="small" icon={<MoreOutlined />}>
            更多
          </Button>
        </Dropdown>
      </div>
    )
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 左侧导航 */}
      <Sider 
        theme="light" 
        collapsible 
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{ 
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
          zIndex: 10
        }}
      >
        <div style={{ 
          height: '64px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <h2 style={{ margin: 0, color: '#1890ff', fontSize: collapsed ? '14px' : '18px' }}>
            {collapsed ? '世软' : '世软云后台'}
          </h2>
        </div>
        <Menu 
          theme="light" 
          mode="inline" 
          selectedKeys={getSelectedKey()}
          items={menuItems}
          style={{ borderRight: 0 }}
        />
      </Sider>
      
      <Layout>
        {/* 顶部Header */}
        <Header style={{ 
          background: '#fff', 
          padding: '0 24px', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #f0f0f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          {/* 左侧：门店选择器和搜索 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Dropdown
              menu={{
                items: [
                  { key: 'store1', label: '总店（万达广场店）' },
                  { key: 'store2', label: '分店（银泰城店）' },
                  { key: 'store3', label: '分店（龙湖天街店）' },
                ]
              }}
            >
              <Button icon={<ShopOutlined />}>
                总店（万达广场店） <DownOutlined />
              </Button>
            </Dropdown>
            <Button icon={<SearchOutlined />}>搜索功能菜单...</Button>
          </div>
          
          {/* 右侧：功能按钮 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Button type="text" icon={<QuestionCircleOutlined />}>知识库</Button>
            <Button type="text" icon={<ExportOutlined />}>下载</Button>
            <Badge count={5} size="small">
              <Button type="text" icon={<BellOutlined />} />
            </Badge>
            
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <Avatar style={{ backgroundColor: '#1890ff' }}>CZF</Avatar>
                <span>管理员</span>
                <DownOutlined />
              </div>
            </Dropdown>
          </div>
        </Header>

        {/* 标签页栏 */}
        <div style={{ 
          background: '#f5f5f5', 
          borderBottom: '1px solid #e8e8e8',
          padding: '4px 0 0',
        }}>
          <Tabs
            type="editable-card"
            activeKey={activeKey}
            onChange={handleTabChange}
            onEdit={(targetKey, action) => {
              if (action === 'remove') {
                handleTabClose(targetKey as string);
              }
            }}
            hideAdd
            items={tabs.map(tab => ({
              key: tab.key,
              label: (
                <span>
                  {tab.icon && <span style={{ marginRight: 4 }}>{tab.icon}</span>}
                  {tab.label}
                </span>
              ),
              closable: tab.closable,
            }))}
            size="small"
            style={{ marginBottom: 0 }}
            tabBarStyle={{ margin: 0, paddingLeft: 16 }}
            {...tabBarExtraContent}
          />
        </div>
        
        {/* 主内容区 */}
        <Content style={{ 
          margin: 0, 
          padding: 24,
          background: '#f0f2f5',
          minHeight: 'calc(100vh - 112px)'
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
