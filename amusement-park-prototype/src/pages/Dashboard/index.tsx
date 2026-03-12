import React from 'react';
import { Row, Col, Card, Statistic, Button, Space, List, Tag } from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  ShoppingCartOutlined,
  UserAddOutlined,
  ToolOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  RightOutlined 
} from '@ant-design/icons';
import { Column, Pie, DualAxes } from '@ant-design/charts';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // 基于用户提供的首页原型图片和油菜花系统观察设计
  // 核心数据卡片 - 严格按用户图片要求
  const coreStats = [
    {
      title: '今日营收',
      value: '¥68,420',
      prefix: '¥',
      suffix: '',
      change: '+12.5%',
      changeType: 'up',
      icon: <ShoppingCartOutlined />,
      color: '#1890ff',
      description: '相比昨日',
      action: () => navigate('/ticket/statistics'),
    },
    {
      title: '入园人数',
      value: '2,847',
      prefix: '',
      suffix: '人',
      change: '+8.3%',
      changeType: 'up',
      icon: <UserAddOutlined />,
      color: '#52c41a',
      description: '实时统计',
      action: () => navigate('/ticket/query'),
    },
    {
      title: '会员新增',
      value: '156',
      prefix: '',
      suffix: '人',
      change: '+23.1%',
      changeType: 'up',
      icon: <UserAddOutlined />,
      color: '#fa8c16',
      description: '今日新增',
      action: () => navigate('/member/archive'),
    },
    {
      title: '设备状态',
      value: '42/45',
      prefix: '',
      suffix: '台正常',
      change: '-2',
      changeType: 'down',
      icon: <ToolOutlined />,
      color: '#722ed1',
      description: '3台维护中',
      action: () => navigate('/device/monitor'),
    },
  ];

  // 营收趋势数据 - 基于油菜花系统观察
  const revenueData = [
    { month: '3.4', 营收: 58000 },
    { month: '3.5', 营收: 62000 },
    { month: '3.6', 营收: 59800 },
    { month: '3.7', 营收: 71500 },
    { month: '3.8', 营收: 68420 },
    { month: '3.9', 营收: 70200 },
    { month: '3.10', 营收: 74200 },
  ];

  // 客流分布数据
  const visitorData = [
    { time: '09:00-10:00', 人数: 320 },
    { time: '10:00-11:00', 人数: 580 },
    { time: '11:00-12:00', 人数: 420 },
    { time: '12:00-13:00', 人数: 380 },
    { time: '13:00-14:00', 人数: 520 },
    { time: '14:00-15:00', 人数: 680 },
    { time: '15:00-16:00', 人数: 720 },
    { time: '16:00-17:00', 人数: 640 },
    { time: '17:00-18:00', 人数: 380 },
  ];

  // 会员增长数据
  const memberData = [
    { type: '普通会员', value: 2340 },
    { type: 'VIP会员', value: 856 },
    { type: 'SVIP会员', value: 298 },
  ];

  // 待办事项 - 基于油菜花系统观察
  const todoItems = [
    {
      id: 1,
      title: '待处理退票申请',
      type: 'ticket',
      count: 5,
      priority: 'high',
      time: '10分钟前',
    },
    {
      id: 2,
      title: '会员生日特权审核',
      type: 'member',
      count: 3,
      priority: 'medium',
      time: '30分钟前',
    },
    {
      id: 3,
      title: '设备故障报警',
      type: 'device',
      count: 2,
      priority: 'high',
      time: '1小时前',
    },
    {
      id: 4,
      title: '财务报表生成',
      type: 'finance',
      count: 1,
      priority: 'low',
      time: '今天',
    },
    {
      id: 5,
      title: '商品库存不足提醒',
      type: 'product',
      count: 8,
      priority: 'medium',
      time: '2小时前',
    },
  ];

  // 快捷操作 - 基于用户提供的首页原型图片
  const quickActions = [
    {
      title: '快速售票',
      icon: '🎫',
      description: '扫码或手动出票',
      color: '#1890ff',
      path: '/ticket/sell',
    },
    {
      title: '会员办卡',
      icon: '👤',
      description: '新会员注册办卡',
      color: '#52c41a',
      path: '/member/archive',
    },
    {
      title: '商品上架',
      icon: '📦',
      description: '添加新商品',
      color: '#fa8c16',
      path: '/product/list',
    },
    {
      title: '设备报修',
      icon: '🔧',
      description: '设备故障上报',
      color: '#722ed1',
      path: '/device/alarm',
    },
  ];

  // 图表配置
  const revenueConfig = {
    data: revenueData,
    xField: 'month',
    yField: '营收',
    xAxis: {
      title: {
        text: '日期',
      },
    },
    yAxis: {
      title: {
        text: '营收（元）',
      },
    },
    label: {
      style: {
        fill: '#666',
      },
    },
    color: '#1890ff',
    smooth: true,
  };

  const visitorConfig = {
    data: visitorData,
    xField: 'time',
    yField: '人数',
    xAxis: {
      title: {
        text: '时间段',
      },
    },
    yAxis: {
      title: {
        text: '人数',
      },
    },
    color: '#52c41a',
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
  };

  const memberConfig = {
    data: memberData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [{ type: 'element-active' }],
  };

  return (
    <div>
      {/* 欢迎区域 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: 8 }}>
            欢迎回来，管理员！👋
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            今天是2026年3月10日，周二。您有{todoItems.length}个待办事项需要处理。
          </p>
        </div>
      </motion.div>

      {/* 核心数据卡片 - 按用户图片要求4个 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {coreStats.map((stat, index) => (
          <Col xs={24} sm={12} md={12} lg={6} key={stat.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card 
                hoverable
                onClick={stat.action}
                style={{ 
                  borderRadius: 8,
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ color: '#666', fontSize: '14px', marginBottom: 8 }}>{stat.title}</div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: stat.color, marginBottom: 4 }}>
                      {stat.value}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ 
                        color: stat.changeType === 'up' ? '#52c41a' : '#ff4d4f',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                        {stat.changeType === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        {stat.change}
                      </span>
                      <span style={{ color: '#999', fontSize: '12px' }}>{stat.description}</span>
                    </div>
                  </div>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: `${stat.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    color: stat.color,
                  }}>
                    {stat.icon}
                  </div>
                </div>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* 图表区域 - 按用户图片要求 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {/* 营收趋势图 */}
        <Col xs={24} lg={12}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Card 
              title="营收趋势（7天）" 
              extra={<Button type="link" size="small" onClick={() => navigate('/ticket/statistics')}>
                查看详情 <RightOutlined />
              </Button>}
              style={{ borderRadius: 8, height: '100%' }}
            >
              <Column {...revenueConfig} height={200} />
            </Card>
          </motion.div>
        </Col>

        {/* 客流分布图 */}
        <Col xs={24} lg={12}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card 
              title="今日客流分布" 
              extra={<Button type="link" size="small" onClick={() => navigate('/ticket/query')}>
                查看详情 <RightOutlined />
              </Button>}
              style={{ borderRadius: 8, height: '100%' }}
            >
              <Column {...visitorConfig} height={200} />
            </Card>
          </motion.div>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* 快捷操作 - 按用户图片要求4个 */}
        <Col xs={24} lg={12}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card 
              title="快捷操作" 
              style={{ borderRadius: 8, height: '100%' }}
            >
              <Row gutter={[16, 16]}>
                {quickActions.map((action, index) => (
                  <Col xs={12} sm={12} md={6} lg={6} key={action.title}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        type="text"
                        style={{
                          width: '100%',
                          height: '100%',
                          padding: '16px 8px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 8,
                          border: `1px solid ${action.color}20`,
                          background: `${action.color}08`,
                        }}
                        onClick={() => navigate(action.path)}
                      >
                        <div style={{ fontSize: '32px', marginBottom: 8 }}>{action.icon}</div>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: 4 }}>
                          {action.title}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>{action.description}</div>
                      </Button>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </Card>
          </motion.div>
        </Col>

        {/* 待办事项 - 按油菜花系统观察 */}
        <Col xs={24} lg={12}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card 
              title="待办事项" 
              extra={<Button type="link" size="small" onClick={() => {}}>
                全部处理
              </Button>}
              style={{ borderRadius: 8, height: '100%' }}
            >
              <List
                dataSource={todoItems}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button 
                        type="link" 
                        size="small"
                        onClick={() => {
                          // 根据类型跳转到不同页面
                          if (item.type === 'ticket') navigate('/ticket/refund');
                          else if (item.type === 'member') navigate('/member/marketing');
                          else if (item.type === 'device') navigate('/device/alarm');
                          else if (item.type === 'finance') navigate('/finance/reports');
                          else if (item.type === 'product') navigate('/product/inventory');
                        }}
                      >
                        处理
                      </Button>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <div style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: item.priority === 'high' ? '#ff4d4f15' : 
                                     item.priority === 'medium' ? '#fa8c1615' : '#1890ff15',
                        }}>
                          {item.type === 'ticket' ? '🎫' :
                           item.type === 'member' ? '👤' :
                           item.type === 'device' ? '🔧' :
                           item.type === 'finance' ? '💰' : '📦'}
                        </div>
                      }
                      title={
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span>{item.title}</span>
                          <Tag color={
                            item.priority === 'high' ? 'error' :
                            item.priority === 'medium' ? 'warning' : 'processing'
                          }>
                            {item.count}个
                          </Tag>
                        </div>
                      }
                      description={
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#999' }}>
                          <ClockCircleOutlined />
                          <span style={{ fontSize: '12px' }}>{item.time}</span>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* 会员分布饼图 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        style={{ marginTop: 24 }}
      >
        <Card 
          title="会员分布" 
          extra={<Button type="link" size="small" onClick={() => navigate('/member/analysis')}>
            查看分析 <RightOutlined />
          </Button>}
          style={{ borderRadius: 8 }}
        >
          <div style={{ height: 300, display: 'flex', justifyContent: 'center' }}>
            <Pie {...memberConfig} height={300} />
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;