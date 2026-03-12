import React from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Button, 
  List, 
  Tag, 
  Progress,
  Typography,
  Space
} from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  ShoppingCartOutlined,
  UserAddOutlined,
  ToolOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Title, Text } = Typography;

// 模拟数据
const revenueData = [
  { date: '03-01', 营收: 42000 },
  { date: '03-02', 营收: 52000 },
  { date: '03-03', 营收: 38000 },
  { date: '03-04', 营收: 61000 },
  { date: '03-05', 营收: 49000 },
  { date: '03-06', 营收: 55000 },
  { date: '03-07', 营收: 72000 },
];

const visitorData = [
  { time: '09:00', 人数: 120 },
  { time: '10:00', 人数: 280 },
  { time: '11:00', 人数: 450 },
  { time: '12:00', 人数: 380 },
  { time: '13:00', 人数: 520 },
  { time: '14:00', 人数: 610 },
  { time: '15:00', 人数: 480 },
  { time: '16:00', 人数: 320 },
  { time: '17:00', 人数: 180 },
];

const memberData = [
  { name: '普通会员', value: 2400, color: '#1890ff' },
  { name: '银卡会员', value: 1200, color: '#52c41a' },
  { name: '金卡会员', value: 800, color: '#faad14' },
  { name: '钻石会员', value: 400, color: '#f5222d' },
];

const todoList = [
  { id: 1, type: '票务', title: '处理退票申请', priority: 'high', status: 'pending' },
  { id: 2, type: '会员', title: '审核会员升级', priority: 'medium', status: 'pending' },
  { id: 3, type: '设备', title: '检查旋转木马', priority: 'high', status: 'in-progress' },
  { id: 4, type: '财务', title: '月度对账', priority: 'medium', status: 'pending' },
  { id: 5, type: '商品', title: '补充库存', priority: 'low', status: 'completed' },
];

const quickActions = [
  { icon: <CreditCardOutlined />, label: '快速售票', color: '#1890ff', path: '/ticket/sale' },
  { icon: <UserAddOutlined />, label: '会员办卡', color: '#52c41a', path: '/member/list' },
  { icon: <ShoppingCartOutlined />, label: '商品上架', color: '#faad14', path: '/product/list' },
  { icon: <ToolOutlined />, label: '设备报修', color: '#f5222d', path: '/device/alert' },
];

const DashboardPage: React.FC = () => {
  const getPriorityTag = (priority: string) => {
    switch(priority) {
      case 'high': return <Tag color="red">高</Tag>;
      case 'medium': return <Tag color="orange">中</Tag>;
      case 'low': return <Tag color="green">低</Tag>;
      default: return <Tag>中</Tag>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'in-progress': return <ClockCircleOutlined style={{ color: '#faad14' }} />;
      case 'pending': return <ExclamationCircleOutlined style={{ color: '#f5222d' }} />;
      default: return <ExclamationCircleOutlined />;
    }
  };

  return (
    <div>
      <Title level={4} style={{ marginBottom: 24 }}>工作台</Title>
      
      {/* 4个核心数据卡片 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日营收"
              value={65800}
              precision={0}
              prefix="¥"
              suffix={
                <span style={{ fontSize: 12, color: '#52c41a' }}>
                  <ArrowUpOutlined /> 12.5%
                </span>
              }
            />
            <Text type="secondary" style={{ fontSize: 12 }}>较昨日增长</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="入园人数"
              value={2850}
              suffix={
                <span style={{ fontSize: 12, color: '#f5222d' }}>
                  <ArrowDownOutlined /> 3.2%
                </span>
              }
            />
            <Text type="secondary" style={{ fontSize: 12 }}>较昨日减少</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="会员新增"
              value={142}
              suffix={
                <span style={{ fontSize: 12, color: '#52c41a' }}>
                  <ArrowUpOutlined /> 8.7%
                </span>
              }
            />
            <Text type="secondary" style={{ fontSize: 12 }}>今日新增会员</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>设备状态</div>
                <div style={{ fontSize: 24, fontWeight: 'bold' }}>98%</div>
              </div>
              <Progress type="circle" percent={98} size={60} strokeColor="#52c41a" />
            </div>
            <Text type="secondary" style={{ fontSize: 12 }}>2台设备维护中</Text>
          </Card>
        </Col>
      </Row>

      {/* 快捷操作 */}
      <Card title="快捷操作" style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          {quickActions.map((action, index) => (
            <Col span={6} key={index}>
              <Button 
                type="primary" 
                icon={action.icon} 
                block 
                size="large"
                style={{ 
                  background: action.color,
                  borderColor: action.color,
                  height: 80,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <div>{action.label}</div>
              </Button>
            </Col>
          ))}
        </Row>
      </Card>

      {/* 图表区域 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card title="营收趋势（7天）">
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="营收" stroke="#1890ff" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="客流分布（今日时段）">
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={visitorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="人数" fill="#52c41a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 待办事项和会员分布 */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="待办事项">
            <List
              dataSource={todoList}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button type="link" size="small">处理</Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={getStatusIcon(item.status)}
                    title={
                      <Space>
                        <Tag color="blue">{item.type}</Tag>
                        {item.title}
                        {getPriorityTag(item.priority)}
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="会员分布">
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={memberData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {memberData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;