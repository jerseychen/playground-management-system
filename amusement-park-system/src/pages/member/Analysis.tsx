import React from 'react';
import { Card, Row, Col, Statistic, Table, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined, ShoppingOutlined, RiseOutlined, TeamOutlined } from '@ant-design/icons';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Title } = Typography;

const growthData = [
  { month: '1月', 新增会员: 120, 流失会员: 20 },
  { month: '2月', 新增会员: 150, 流失会员: 25 },
  { month: '3月', 新增会员: 180, 流失会员: 15 },
  { month: '4月', 新增会员: 220, 流失会员: 30 },
  { month: '5月', 新增会员: 280, 流失会员: 20 },
  { month: '6月', 新增会员: 320, 流失会员: 25 },
];

const levelDistribution = [
  { name: '普通会员', value: 4800, color: '#d9d9d9' },
  { name: '银卡会员', value: 2400, color: '#b7eb8f' },
  { name: '金卡会员', value: 1600, color: '#ffd666' },
  { name: '钻石会员', value: 800, color: '#d3adf7' },
];

const activityData = [
  { range: '高活跃', count: 1200, percentage: '12%' },
  { range: '中活跃', count: 3600, percentage: '36%' },
  { range: '低活跃', count: 2800, percentage: '28%' },
  { range: '沉睡', count: 2400, percentage: '24%' },
];

const MemberAnalysisPage: React.FC = () => {
  const columns = [
    { title: '会员等级', dataIndex: 'level', key: 'level' },
    { title: '人数', dataIndex: 'count', key: 'count' },
    { title: '占比', dataIndex: 'percentage', key: 'percentage' },
    { title: '平均消费', dataIndex: 'avgSpend', key: 'avgSpend', render: (val: number) => `¥${val}` },
    { title: '平均客单价', dataIndex: 'avgOrder', key: 'avgOrder', render: (val: number) => `¥${val}` },
  ];

  const data = [
    { key: '1', level: '普通会员', count: 4800, percentage: '48%', avgSpend: 850, avgOrder: 120 },
    { key: '2', level: '银卡会员', count: 2400, percentage: '24%', avgSpend: 2200, avgOrder: 180 },
    { key: '3', level: '金卡会员', count: 1600, percentage: '16%', avgSpend: 4500, avgOrder: 280 },
    { key: '4', level: '钻石会员', count: 800, percentage: '8%', avgSpend: 8800, avgOrder: 450 },
  ];

  return (
    <div>
      <Title level={4}>会员分析</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总会员数"
              value={9600}
              prefix={<TeamOutlined />}
              suffix={<span style={{ fontSize: 12, color: '#52c41a' }}><ArrowUpOutlined /> 12.5%</span>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="活跃会员"
              value={4800}
              prefix={<UserOutlined />}
              suffix={<span style={{ fontSize: 12, color: '#52c41a' }}>50%</span>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="会员消费总额"
              value={2580000}
              prefix="¥"
              suffix={<span style={{ fontSize: 12, color: '#52c41a' }}><ArrowUpOutlined /> 18.2%</span>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="会员客单价"
              value={268}
              prefix="¥"
              suffix={<span style={{ fontSize: 12, color: '#f5222d' }}><ArrowDownOutlined /> 3.1%</span>}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card title="会员增长趋势">
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="新增会员" stroke="#52c41a" strokeWidth={2} />
                  <Line type="monotone" dataKey="流失会员" stroke="#f5222d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="会员等级分布">
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={levelDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {levelDistribution.map((entry, index) => (
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

      <Row gutter={16}>
        <Col span={12}>
          <Card title="会员活跃度分布">
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1890ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="会员等级数据">
            <Table columns={columns} dataSource={data} pagination={false} size="small" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MemberAnalysisPage;