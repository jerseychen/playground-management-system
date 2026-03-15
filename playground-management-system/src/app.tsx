import { RunTimeLayoutConfig, useLocation, useNavigate } from '@umijs/max';
import { history } from '@umijs/max';
import { Avatar, Dropdown, Space, Badge, Button, Input, Select, Tabs, message, Switch, Tooltip } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  DownloadOutlined,
  SearchOutlined,
  ShopOutlined,
  CloseOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';

const { Option } = Select;

// 标签页状态管理
interface TabItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  closable?: boolean;
}

// 全局标签页状态
const getStoredTabs = (): TabItem[] => {
  try {
    const stored = localStorage.getItem('playground-tabs');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to parse stored tabs:', e);
  }
  return [{ key: '/dashboard/analysis', label: '首页', icon: <HomeOutlined />, closable: false }];
};

const storeTabs = (tabs: TabItem[]) => {
  try {
    localStorage.setItem('playground-tabs', JSON.stringify(tabs));
  } catch (e) {
    console.error('Failed to store tabs:', e);
  }
};

// 菜单显示模式
const getMenuMode = (): 'expanded' | 'collapsed' => {
  try {
    return localStorage.getItem('playground-menu-mode') as 'expanded' | 'collapsed' || 'expanded';
  } catch (e) {
    return 'expanded';
  }
};

const storeMenuMode = (mode: 'expanded' | 'collapsed') => {
  try {
    localStorage.setItem('playground-menu-mode', mode);
  } catch (e) {
    console.error('Failed to store menu mode:', e);
  }
};

// 运行时配置
export const layout: RunTimeLayoutConfig = () => {
  const [menuMode, setMenuMode] = useState<'expanded' | 'collapsed'>(getMenuMode());

  return {
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    menu: {
      locale: false,
      // 根据模式设置菜单展开方式
      defaultOpenAll: menuMode === 'expanded',
    },
    layout: 'side',
    splitMenus: false,
    // 首页不在菜单中显示
    route: {
      path: '/dashboard/analysis',
      hideInMenu: true,
    },
    // 自定义菜单项渲染
    menuItemRender: (item: any, defaultDom: React.ReactNode) => {
      // 如果是首页，不渲染
      if (item.path === '/dashboard/analysis') {
        return null;
      }
      return defaultDom;
    },
    headerContentRender: () => {
      return (
        <Space size="large" style={{ marginLeft: 24 }}>
          <Select
            defaultValue="store1"
            style={{ width: 180 }}
            suffixIcon={<ShopOutlined />}
          >
            <Option value="store1">总店（万达广场店）</Option>
            <Option value="store2">分店（银泰城店）</Option>
            <Option value="store3">分店（龙湖天街店）</Option>
          </Select>
          <Input.Search
            placeholder="搜索功能菜单..."
            style={{ width: 200 }}
            prefix={<SearchOutlined />}
          />
        </Space>
      );
    },
    rightContentRender: () => {
      const items: MenuProps['items'] = [
        {
          key: 'profile',
          icon: <UserOutlined />,
          label: '个人中心',
        },
        {
          key: 'settings',
          icon: <QuestionCircleOutlined />,
          label: '帮助文档',
        },
        {
          type: 'divider',
        },
        {
          key: 'logout',
          icon: <LogoutOutlined />,
          label: '退出登录',
        },
      ];

      return (
        <Space size="middle">
          {/* 菜单模式切换 */}
          <Tooltip title={menuMode === 'expanded' ? '切换为悬浮菜单' : '切换为常驻菜单'}>
            <Button
              type="text"
              icon={menuMode === 'expanded' ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
              onClick={() => {
                const newMode = menuMode === 'expanded' ? 'collapsed' : 'expanded';
                setMenuMode(newMode);
                storeMenuMode(newMode);
                window.location.reload();
              }}
            >
              {menuMode === 'expanded' ? '常驻菜单' : '悬浮菜单'}
            </Button>
          </Tooltip>
          <Button type="text" icon={<QuestionCircleOutlined />}>知识库</Button>
          <Button type="text" icon={<DownloadOutlined />}>下载</Button>
          <Badge count={5} size="small">
            <Button type="text" icon={<BellOutlined />} />
          </Badge>
          <Dropdown menu={{ items }} placement="bottomRight">
            <Space style={{ cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} />
              <span>管理员</span>
            </Space>
          </Dropdown>
        </Space>
      );
    },
    footerRender: () => {
      return (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          游乐场管理系统 ©2026 世软科技
        </div>
      );
    },
    // 自定义内容区域，添加标签页
    contentStyle: {
      padding: 0,
      margin: 0,
    },
    childrenRender: (children: React.ReactNode) => {
      return <TabLayout menuMode={menuMode}>{children}</TabLayout>;
    },
  };
};

// 标签页布局组件
const TabLayout: React.FC<{ children: React.ReactNode; menuMode: 'expanded' | 'collapsed' }> = ({ children, menuMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [tabs, setTabs] = useState<TabItem[]>(getStoredTabs);
  const [activeKey, setActiveKey] = useState(location.pathname);

  // 路由映射表
  const routeMap: Record<string, { label: string; icon?: React.ReactNode }> = {
    '/dashboard/analysis': { label: '首页', icon: <HomeOutlined /> },
    '/business/checkout/shift': { label: '交班结账' },
    '/business/checkout/report': { label: '营业报表' },
    '/business/payment/orders': { label: '支付订单' },
    '/business/payment/refunds': { label: '订单退款记录' },
    '/business/payment/reconciliation': { label: '支付方式对账' },
    '/business/query/data': { label: '营业数据' },
    '/business/query/sales': { label: '销售查询' },
    '/business/query/entry': { label: '交账录入' },
    '/business/query/history': { label: '历史账目' },
    '/business/query/coin-price': { label: '币单价' },
    '/business/query/avg-price': { label: '客单价' },
    '/business/query/revenue': { label: '确收报表' },
    '/business/query/comparison': { label: '经营对比' },
    '/business/query/asset-recon': { label: '门店资产对账' },
    '/business/query/physical-coin': { label: '门店实物币对账' },
    '/business/query/roaming': { label: '漫游对账' },
    '/business/other/income': { label: '其他收入查询' },
    '/business/other/expense': { label: '其他支出查询' },
    '/business/other/settings': { label: '其他收支设置' },
    '/business/ledger/parties': { label: '分账方' },
    '/business/ledger/query': { label: '分账查询' },
    '/business/payment-mgmt': { label: '支付管理' },
    '/package/management': { label: '套餐管理' },
    '/package/sales': { label: '套餐销售' },
    '/product/list': { label: '商品列表' },
    '/product/inventory': { label: '库存管理' },
    '/marketing/coupon': { label: '优惠券' },
    '/marketing/activity': { label: '活动管理' },
    '/member/profile': { label: '会员档案' },
    '/member/points': { label: '积分管理' },
    '/miniprogram/settings': { label: '小程序设置' },
    '/miniprogram/decorate': { label: '页面装修' },
    '/report/business': { label: '营业查询' },
    '/report/finance': { label: '财务报表' },
    '/equipment/monitor': { label: '设备监控' },
    '/equipment/maintenance': { label: '维护记录' },
    '/sports/items': { label: '运动项目' },
    '/sports/booking': { label: '预约管理' },
    '/settings/system': { label: '系统设置' },
    '/settings/permission': { label: '权限管理' },
  };

  // 监听路由变化，自动添加标签页
  useEffect(() => {
    const currentPath = location.pathname;
    setActiveKey(currentPath);

    // 如果当前路由不在标签页中，添加它
    const exists = tabs.find(tab => tab.key === currentPath);
    if (!exists) {
      const routeInfo = routeMap[currentPath];
      if (routeInfo) {
        const newTabs = [...tabs, {
          key: currentPath,
          label: routeInfo.label,
          icon: routeInfo.icon,
          closable: currentPath !== '/dashboard/analysis', // 首页不可关闭
        }];
        setTabs(newTabs);
        storeTabs(newTabs);
      }
    }
  }, [location.pathname]);

  // 处理标签页切换
  const handleTabChange = (key: string) => {
    setActiveKey(key);
    navigate(key);
  };

  // 处理标签页关闭
  const handleTabClose = (targetKey: string) => {
    const newTabs = tabs.filter(tab => tab.key !== targetKey);
    setTabs(newTabs);
    storeTabs(newTabs);

    // 如果关闭的是当前标签页，切换到上一个标签页
    if (targetKey === activeKey) {
      const currentIndex = tabs.findIndex(tab => tab.key === targetKey);
      const newActiveKey = tabs[currentIndex - 1]?.key || tabs[0]?.key;
      if (newActiveKey) {
        setActiveKey(newActiveKey);
        navigate(newActiveKey);
      }
    }
  };

  // 自定义标签页渲染
  const renderTabBar = (props: any, DefaultTabBar: React.ComponentType<any>) => (
    <DefaultTabBar {...props}>
      {(node: React.ReactNode) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {node}
        </div>
      )}
    </DefaultTabBar>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 标签页栏 */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
        padding: '8px 16px 0',
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
                {tab.icon}
                {tab.label}
              </span>
            ),
            closable: tab.closable,
          }))}
        />
      </div>

      {/* 内容区域 */}
      <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
        {children}
      </div>
    </div>
  );
};

export default layout;