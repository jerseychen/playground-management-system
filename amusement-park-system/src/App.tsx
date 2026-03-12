import { RunTimeLayoutConfig, useLocation, useNavigate, useAliveController } from '@umijs/max';
import { history } from '@umijs/max';
import { Avatar, Dropdown, Space, Badge, Button, Input, Select, Tabs, message } from 'antd';
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

// 全局标签页状态（使用 localStorage 持久化）
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

// 运行时配置
export const layout: RunTimeLayoutConfig = () => {
  return {
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    menu: {
      locale: false,
    },
    layout: 'mix',
    splitMenus: false,
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
      return <TabLayout>{children}</TabLayout>;
    },
    onPageChange: () => {
      const { location } = history;
      console.log('Page changed:', location.pathname);
    },
  };
};

// 标签页布局组件
const TabLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dropScope, refreshScope } = useAliveController?.() || {};
  
  const [tabs, setTabs] = useState<TabItem[]>(getStoredTabs);
  const [activeKey, setActiveKey] = useState(location.pathname);

  // 路由映射表（用于根据路径获取菜单名称）
  const routeMap: Record<string, { label: string; icon?: React.ReactNode }> = {
    '/dashboard/analysis': { label: '首页', icon: <HomeOutlined /> },
    '/business/checkout/shift': { label: '交班结账' },
    '/business/checkout/report': { label: '营业报表' },
    '/business/payment/orders': { label: '支付订单' },
    '/business/payment/refunds': { label: '退款记录' },
    '/business/payment/reconciliation': { label: '支付对账' },
    '/business/query/data': { label: '营业数据' },
    '/business/query/sales': { label: '销售查询' },
    '/business/other/income': { label: '其他收入' },
    '/business/other/expense': { label: '其他支出' },
    '/business/ledger/parties': { label: '分账方' },
    '/business/ledger/query': { label: '分账查询' },
    '/business/payment-mgmt': { label: '支付管理' },
    '/package/coin-ticket/coin': { label: '售币套餐' },
    '/package/coin-ticket/ticket': { label: '门票套餐' },
    '/package/combo/gift': { label: '充值大礼包' },
    '/package/combo/sales': { label: '组合销售' },
    '/package/member/coin': { label: '代币入会' },
    '/package/member/ticket': { label: '门票入会' },
    '/package/marble': { label: '弹珠套餐' },
    '/package/machine/time': { label: '机台包时' },
    '/package/machine/rounds': { label: '机台局数' },
    '/package/other/misc': { label: '杂项套餐' },
    '/package/other/convert': { label: '资产转换' },
    '/package/other/birthday': { label: '生日套餐' },
    '/package/other/upgrade': { label: '会员升级' },
    '/package/other/borrow': { label: '借卡套餐' },
    '/package/group/channel-config': { label: '渠道配置' },
    '/package/group/channel-package': { label: '渠道套餐' },
    '/package/group/qr-code': { label: '一物一码' },
    '/package/settings/pos': { label: '销售位置' },
    '/package/assets/coupon': { label: '优惠券管理' },
    '/package/assets/points': { label: '积分管理' },
    '/package/assets/gift-card': { label: '礼品卡管理' },
    '/product/info': { label: '商品资料' },
    '/product/inventory/purchase-request': { label: '商品申购' },
    '/product/inventory/purchase': { label: '商品采购' },
    '/product/inventory/mgmt': { label: '库存管理' },
    '/product/inventory/transfer': { label: '商品调拨' },
    '/product/inventory/stocktaking': { label: '库存盘点' },
    '/product/query/stock': { label: '库存查询' },
    '/product/query/changes': { label: '库存变动' },
    '/product/settings/basic': { label: '基础设置' },
    '/product/settings/warehouse': { label: '仓库设置' },
    '/product/settings/supplier': { label: '供应商管理' },
    '/marketing/center/main': { label: '营销中心' },
    '/marketing/center/promotion': { label: '促销营销' },
    '/marketing/center/machine': { label: '机台营销' },
    '/marketing/center/member': { label: '会员营销' },
    '/marketing/atmosphere/daily': { label: '日常氛围' },
    '/marketing/atmosphere/event': { label: '活动氛围' },
    '/marketing/notice/mgmt': { label: '通知管理' },
    '/member/mgmt/level': { label: '会员级别' },
    '/member/mgmt/benefits': { label: '会员权益' },
    '/member/mgmt/tags': { label: '会员标签' },
    '/member/upgrade': { label: '会员升降级' },
    '/member/card/mgmt': { label: '会员卡管理' },
    '/miniprogram/wechat/decorate': { label: '小程序装修' },
    '/miniprogram/wechat/settings': { label: '小程序设置' },
    '/miniprogram/wechat/store': { label: '门店管理' },
    '/miniprogram/alliance/merchants': { label: '异业商户' },
    '/miniprogram/jd/orders': { label: '京东礼品订单' },
    '/miniprogram/self/mall': { label: '自营礼品商城' },
    '/miniprogram/query/orders': { label: '小程序订单' },
    '/report/dashboard': { label: '数据大屏' },
    '/report/custom': { label: '定制报表' },
    '/report/sales/query': { label: '销售查询' },
    '/report/sales/trend': { label: '销售趋势' },
    '/report/exchange/query': { label: '兑换查询' },
    '/report/exchange/recycle': { label: '回收记录' },
    '/report/machine': { label: '机台报表' },
    '/report/member': { label: '会员报表' },
    '/report/project/consumption': { label: '大项目消费' },
    '/report/equipment': { label: '设备报表' },
    '/report/audit/auth': { label: '授权记录' },
    '/report/audit/ai-risk': { label: 'AI风控记录' },
    '/equipment/dashboard': { label: '设备看板' },
    '/equipment/game/archive': { label: '游戏机档案' },
    '/equipment/game/inventory': { label: '游戏机库存' },
    '/equipment/game/status': { label: '游戏机状态' },
    '/equipment/project/mgmt': { label: '大项目管理' },
    '/equipment/business': { label: '营业设备' },
    '/equipment/lottery': { label: '抽奖机' },
    '/equipment/gift-cabinet': { label: '礼品柜' },
    '/equipment/rental/projects': { label: '租赁项目' },
    '/equipment/rental/records': { label: '租赁记录' },
    '/equipment/base-station/area': { label: '区域基站' },
    '/equipment/group': { label: '机台分组' },
    '/sports/mgmt/badge': { label: '徽章设置' },
    '/sports/mgmt/privilege': { label: '特权设置' },
    '/sports/mgmt/exp-level': { label: '经验值等级' },
    '/sports/mgmt/functions': { label: '功能项目' },
    '/sports/mgmt/checkpoint': { label: '打卡点管理' },
    '/sports/mgmt/route': { label: '路线管理' },
    '/sports/mgmt/ranking': { label: '排行榜' },
    '/sports/equipment/checkpoint': { label: '打卡设备' },
    '/sports/equipment/service-station': { label: '玩家服务站' },
    '/sports/team/coach': { label: '教练登记' },
    '/sports/team/orders': { label: '团建订单' },
    '/sports/query/route': { label: '路线使用查询' },
    '/sports/query/energy': { label: '会员能量查询' },
    '/settings/user/mgmt': { label: '用户管理' },
    '/settings/user/department': { label: '部门管理' },
    '/settings/store/mgmt': { label: '门店管理' },
    '/settings/store/tags': { label: '标签管理' },
    '/settings/ai-risk/settings': { label: '风控设置' },
    '/settings/system/params': { label: '系统参数' },
    '/settings/system/business-date': { label: '营业日期' },
    '/settings/logs/operation': { label: '操作日志' },
  };

  // 获取路由标签
  const getRouteLabel = (path: string): { label: string; icon?: React.ReactNode } => {
    // 精确匹配
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
    return { label: '未命名页面' };
  };

  // 监听路由变化，自动添加标签页
  useEffect(() => {
    const currentPath = location.pathname;
    setActiveKey(currentPath);

    // 检查是否已存在该标签
    const existingTab = tabs.find(tab => tab.key === currentPath);
    if (!existingTab) {
      const routeInfo = getRouteLabel(currentPath);
      const newTab: TabItem = {
        key: currentPath,
        label: routeInfo.label,
        icon: routeInfo.icon,
        closable: currentPath !== '/dashboard/analysis',
      };
      const newTabs = [...tabs, newTab];
      setTabs(newTabs);
      storeTabs(newTabs);
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
    storeTabs(newTabs);
    
    // 清除 keepalive 缓存
    if (dropScope) {
      dropScope(targetKey);
    }
  };

  // 关闭其他标签页
  const handleCloseOthers = (targetKey: string) => {
    const homeTab = tabs.find(tab => tab.key === '/dashboard/analysis');
    const targetTab = tabs.find(tab => tab.key === targetKey);
    
    if (homeTab && targetTab) {
      const newTabs = targetKey === '/dashboard/analysis' 
        ? [homeTab]
        : [homeTab, { ...targetTab, closable: true }];
      setTabs(newTabs);
      storeTabs(newTabs);
      navigate(targetKey);
    }
  };

  // 关闭所有标签页
  const handleCloseAll = () => {
    const homeTab = tabs.find(tab => tab.key === '/dashboard/analysis');
    if (homeTab) {
      setTabs([homeTab]);
      storeTabs([homeTab]);
      navigate('/dashboard/analysis');
    }
  };

  // 刷新当前标签页
  const handleRefresh = () => {
    if (refreshScope) {
      refreshScope(activeKey);
      message.success('页面已刷新');
    } else {
      window.location.reload();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 标签页栏 */}
      <div style={{ 
        background: '#f5f5f5', 
        borderBottom: '1px solid #e8e8e8',
        padding: '4px 8px 0',
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
          tabBarStyle={{ margin: 0 }}
        />
      </div>
      
      {/* 内容区域 */}
      <div style={{ flex: 1, overflow: 'auto', background: '#f0f2f5' }}>
        {children}
      </div>
    </div>
  );
};

export default layout;
