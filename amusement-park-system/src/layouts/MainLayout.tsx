import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Input, Badge, Avatar, Dropdown, Card, Row, Col, Statistic, DatePicker, Button, Tabs, Table, List } from 'antd';
import { 
  HomeOutlined, 
  ShoppingCartOutlined, 
  ShoppingOutlined, 
  GiftOutlined,
  UserOutlined,
  BarChartOutlined,
  SettingOutlined,
  AppstoreOutlined,
  SearchOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  ExportOutlined,
  MoreOutlined,
  DownOutlined,
  ReloadOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;
const { Search } = Input;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

type MenuItem = Required<MenuProps>['items'][number];

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [timeRange, setTimeRange] = useState('today');

  // 一级菜单 - 按世软云后台结构
  const menuItems: MenuItem[] = [
    {
      key: 'dashboard',
      icon: <HomeOutlined />,
      label: '全部功能',
      onClick: () => navigate('/dashboard')
    },
    {
      key: 'sales',
      icon: <ShoppingCartOutlined />,
      label: '销售管理',
      children: [
        { key: 'sales-order', label: '销售订单', onClick: () => navigate('/sales/order') },
        { key: 'sales-verify', label: '核销订单', onClick: () => navigate('/sales/verify') },
        { key: 'sales-exchange', label: '兑换订单', onClick: () => navigate('/sales/exchange') },
        { key: 'sales-recycle', label: '回收订单', onClick: () => navigate('/sales/recycle') },
        { key: 'sales-other', label: '其它收支', onClick: () => navigate('/sales/other') }
      ]
    },
    {
      key: 'product',
      icon: <ShoppingOutlined />,
      label: '商品管理',
      children: [
        { key: 'product-coin', label: '游戏币套餐', onClick: () => navigate('/product/coin') },
        { key: 'product-limited', label: '限定币套餐', onClick: () => navigate('/product/limited') },
        { key: 'product-marble', label: '弹珠套餐', onClick: () => navigate('/product/marble') },
        { key: 'product-ticket', label: '游乐套票', onClick: () => navigate('/product/ticket') },
        { key: 'product-retail', label: '零售商品', onClick: () => navigate('/product/retail') },
        { key: 'product-combo', label: '组合商品', onClick: () => navigate('/product/combo') }
      ]
    },
    {
      key: 'marketing',
      icon: <GiftOutlined />,
      label: '营销管理',
      children: [
        { key: 'marketing-activity', label: '营销活动', onClick: () => navigate('/marketing/activity') },
        { key: 'marketing-coupon', label: '优惠券', onClick: () => navigate('/marketing/coupon') },
        { key: 'marketing-member', label: '会员营销', onClick: () => navigate('/marketing/member') }
      ]
    },
    {
      key: 'member',
      icon: <UserOutlined />,
      label: '会员体系',
      children: [
        { key: 'member-list', label: '会员档案', onClick: () => navigate('/member/list') },
        { key: 'member-level', label: '会员等级', onClick: () => navigate('/member/level') },
        { key: 'member-points', label: '积分管理', onClick: () => navigate('/member/points') },
        { key: 'member-analysis', label: '会员分析', onClick: () => navigate('/member/analysis') }
      ]
    },
    {
      key: 'report',
      icon: <BarChartOutlined />,
      label: '报表中心',
      children: [
        { key: 'report-revenue', label: '营收报表', onClick: () => navigate('/report/revenue') },
        { key: 'report-coin', label: '耗币报表', onClick: () => navigate('/report/coin') },
        { key: 'report-member', label: '会员报表', onClick: () => navigate('/report/member') },
        { key: 'report-device', label: '设备报表', onClick: () => navigate('/report/device') }
      ]
    },
    {
      key: 'device',
      icon: <AppstoreOutlined />,
      label: '设备管理',
      children: [
        { key: 'device-monitor', label: '设备监控', onClick: () => navigate('/device/monitor') },
        { key: 'device-maintenance', label: '维护记录', onClick: () => navigate('/device/maintenance') },
        { key: 'device-alert', label: '报警管理', onClick: () => navigate('/device/alert') }
      ]
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '系统管理',
      children: [
        { key: 'settings-basic', label: '基础配置', onClick: () => navigate('/settings/basic') },
        { key: 'settings-permission', label: '权限管理', onClick: () => navigate('/settings/permission') },
        { key: 'settings-store', label: '门店管理', onClick: () => navigate('/settings/store') }
      ]
    }
  ];

  // 用户菜单
  const userMenuItems = [
    { key: 'profile', label: '个人中心' },
    { key: 'settings', label: '账号设置' },
    { type: 'divider' as const },
    { key: 'logout', label: '退出登录' }
  ];

  // 获取当前选中的菜单key
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return ['dashboard'];
    const parts = path.split('/');
    if (parts.length >= 2) return [parts[1]];
    return ['dashboard'];
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
          {/* 左侧：面包屑 */}
          <Breadcrumb>
            <Breadcrumb.Item>
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
          </Breadcrumb>
          
          {/* 右侧：功能按钮 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Badge count={0} size="small">
              <Button type="text" icon={<ExportOutlined />}>审批</Button>
            </Badge>
            <Badge count={0} size="small">
              <Button type="text">任务</Button>
            </Badge>
            <Button type="text" icon={<ExportOutlined />}>导出</Button>
            <Button type="text" icon={<QuestionCircleOutlined />}>知识库</Button>
            <Button type="text" icon={<MoreOutlined />}>更多</Button>
            
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <Avatar style={{ backgroundColor: '#1890ff' }}>CZF</Avatar>
                <span>czf</span>
                <DownOutlined />
              </div>
            </Dropdown>
          </div>
        </Header>
        
        {/* 主内容区 */}
        <Content style={{ margin: '24px', background: '#f5f5f5' }}>
          {location.pathname === '/' || location.pathname === '/dashboard' ? (
            // 首页Dashboard
            <DashboardContent />
          ) : (
            <Card style={{ minHeight: 'calc(100vh - 112px)' }}>
              <Outlet />
            </Card>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

// 首页Dashboard内容组件
const DashboardContent: React.FC = () => {
  const [timeRange, setTimeRange] = useState('today');

  // 时间筛选按钮
  const timeButtons = [
    { key: 'today', label: '今日' },
    { key: 'yesterday', label: '昨日' },
    { key: 'week', label: '本周' },
    { key: 'month', label: '本月' }
  ];

  // 核心指标数据
  const statistics = [
    {
      title: '营业额',
      value: 0,
      prefix: '￥',
      suffix: '',
      daily: '日均：￥0',
      weekOverWeek: '周环比：0%',
      icon: <ShoppingCartOutlined style={{ fontSize: 24, color: '#1890ff' }} />
    },
    {
      title: '新增会员',
      value: 0,
      suffix: '人',
      daily: '日均：0人',
      weekOverWeek: '周环比：0%',
      icon: <UserOutlined style={{ fontSize: 24, color: '#52c41a' }} />
    },
    {
      title: '耗币数',
      value: 0,
      suffix: '枚',
      daily: '日均：0枚',
      weekOverWeek: '周环比：0%',
      icon: <GiftOutlined style={{ fontSize: 24, color: '#faad14' }} />
    },
    {
      title: '机台耗币数',
      value: 0,
      suffix: '枚',
      daily: '日均：0枚',
      weekOverWeek: '周环比：0%',
      icon: <AppstoreOutlined style={{ fontSize: 24, color: '#722ed1' }} />
    },
    {
      title: '大项目人数',
      value: 0,
      suffix: '次',
      daily: '日均：0次',
      weekOverWeek: '周环比：0%',
      icon: <BarChartOutlined style={{ fontSize: 24, color: '#eb2f96' }} />
    }
  ];

  return (
    <div>
      {/* 营业概况卡片 */}
      <Card style={{ marginBottom: 24 }}>
        {/* 顶部筛选栏 */}
        <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontWeight: 500 }}>营业日期：</span>
          {timeButtons.map(btn => (
            <Button 
              key={btn.key}
              type={timeRange === btn.key ? 'primary' : 'default'}
              onClick={() => setTimeRange(btn.key)}
            >
              {btn.label}
            </Button>
          ))}
          <RangePicker style={{ width: 240 }} />
          <span style={{ color: '#999' }}>|</span>
          <span style={{ color: '#999' }}>数据更新于：2026-03-11 00:25:00</span>
          <span style={{ color: '#999' }}>|</span>
          <span>门店：<a>0家</a></span>
          <Button icon={<ReloadOutlined />}>刷新</Button>
        </div>

        {/* 核心指标卡片 */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 16 }}>营业概况</h3>
          <Row gutter={16}>
            {statistics.map((stat, index) => (
              <Col span={index === 0 ? 8 : 4} key={stat.title}>
                <Card 
                  bordered={false} 
                  style={{ 
                    background: index === 0 ? '#e6f7ff' : '#f6ffed',
                    borderRadius: 8
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ color: '#666', marginBottom: 8 }}>{stat.title}</div>
                      <div style={{ fontSize: 28, fontWeight: 'bold', color: '#1890ff' }}>
                        {stat.prefix}{stat.value}{stat.suffix}
                      </div>
                      <div style={{ fontSize: 12, color: '#999', marginTop: 8 }}>
                        {stat.daily} | {stat.weekOverWeek}
                      </div>
                    </div>
                    {stat.icon}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* 快捷入口 */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3>快捷入口</h3>
            <Button type="primary" ghost size="small">管理</Button>
          </div>
          <Row gutter={16}>
            <Col span={6}>
              <Card hoverable style={{ textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: 24, color: '#1890ff', marginBottom: 8 }}>+</div>
                <div>系统业务配置</div>
              </Card>
            </Col>
            <Col span={6}>
              <Card hoverable style={{ textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: 24, color: '#52c41a', marginBottom: 8 }}>⚙</div>
                <div>弹珠业务配置向导</div>
              </Card>
            </Col>
          </Row>
        </div>

        {/* 数据可视化区域 */}
        <Tabs defaultActiveKey="revenue">
          <TabPane tab="营收" key="revenue">
            <Row gutter={24}>
              <Col span={16}>
                <Card title="门店销售额排名" extra={<Button type="link">查看更多</Button>}>
                  <Table 
                    size="small"
                    columns={[
                      { title: '排名', dataIndex: 'rank', width: 60 },
                      { title: '门店', dataIndex: 'store' },
                      { title: '销售额', dataIndex: 'amount', align: 'right' }
                    ]}
                    dataSource={[]}
                    locale={{ emptyText: '暂无数据' }}
                    pagination={false}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card title="销售额占比">
                  <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
                    暂无数据
                  </div>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="耗币" key="coin">
            <Row gutter={24}>
              <Col span={12}>
                <Card title="会员消费排名 TOP10">
                  <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
                    暂无数据
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="大项目人数趋势">
                  <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
                    暂无数据
                  </div>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>

      {/* 运营资讯 */}
      <Card title="运营资讯">
        <div style={{ textAlign: 'center', padding: '20px 0', color: '#999' }}>
          暂无资讯
        </div>
      </Card>
    </div>
  );
};

export default MainLayout;