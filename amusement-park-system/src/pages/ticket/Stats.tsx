import React from 'react';
import { Card, Row, Col, Statistic, DatePicker, Select, Button, Table, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, DownloadOutlined } from '@ant-design/icons';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const salesTrendData = [
  { date: '03-01', 销售额: 42000, 订单数: 180 },
  { date: '03-02', 销售额: 52000, 订单数: 220 },
  { date: '03-03', 销售额: 38000, 订单数: 160 },
  { date: '03-04', 销售额: 61000, 订单数: 280 },
  { date: '03-05', 销售额: 49000, 订单数: 210 },
  { date: '03-06', 销售额: 55000, 订单数: 240 },
  { date: '03-07', 销售额: 72000, 订单数: 320 },
];

const ticketTypeData = [
  { name: '成人票', value: 45, color: '#1890ff' },
  { name: '儿童票', value: 25, color: '#52c41a' },
  { name: '老人票', value: 10, color: '#faad14' },
  { name: '学生票', value: 12, color: '#722ed1' },
  { name: '套餐票', value: 8, color: '#eb2f96' },
];

const refundData = [
  { date: '03-01', 退票率: 2.1 },
  { date: '03-02', 退票率: 1.8 },
  { date: '03-03', 退票率: 2.5 },
  { date: '03-04', 退票率: 1.5 },
  { date: '03-05', 退票率: 1.9 },
  { date: '03-06', 退票率: 2.2 },
  { date: '03-07', 退票率: 1.7 },
];

const topSellingData = [
  { key: '1', rank: 1, name: '成人票', sales: 1250, amount: 150000, percentage: '45%' },
  { key: '2', rank: 2, name: '儿童票', sales: 680, amount: 40800, percentage: '25%' },
  { key: '3', rank: 3, name: '家庭套餐', sales: 320, amount: 89600, percentage: '12%' },
  { key: '4', rank: 4, name: '学生票', sales: 280, amount: 25200, percentage: '10%' },
  { key: '5', rank: 5, name: '老人票', sales: 180, amount: 14400, percentage: '8%' },
];

const TicketStatsPage: React.FC = () => {
  const columns = [
    { title: '排名', dataIndex: 'rank', key: 'rank' },
    { title: '票种', dataIndex: 'name', key: 'name' },
    { title: '销量', dataIndex: 'sales', key: 'sales' },
    { title: '销售额', dataIndex: 'amount', key: 'amount', render: (amount: number) => `¥${amount.toLocaleString()}` },
    { title: '占比', dataIndex: 'percentage', key: 'percentage' },
  ];

  return (
    <div>
      <Title level={4}>票务统计</Title>

      <Card style={{ marginBottom: 24 }}>
        <Space size="middle">
          <RangePicker />
          <Select defaultValue="all" style={{ width: 120 }}>
            <Option value="all">全部票种</Option>
            <Option value="adult">成人票</Option>
            <Option value="child">儿童票</Option>
            <Option value="package">套餐票</Option>
          </Select>
          <Button type="primary">查询</Button>
          <Button icon={<DownloadOutlined />}>导出报表</Button>
        </Space>
      </Card>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总销售额"
              value={369000}
              prefix="¥"
              suffix={<span style={{ fontSize: 12, color: '#52c41a' }}><ArrowUpOutlined /> 15.2%</span>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总订单数"
              value={2710}
              suffix={<span style={{ fontSize: 12, color: '#52c41a' }}><ArrowUpOutlined /> 8.7%</span>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="平均客单价"
              value={136}
              prefix="¥"
              suffix={<span style={{ fontSize: 12, color: '#f5222d' }}><ArrowDownOutlined /> 2.1%</span>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="退票率"
              value={2.1}
              suffix="%"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card title="销售趋势">
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="销售额" stroke="#1890ff" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="订单数" stroke="#52c41a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="票种分布">
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ticketTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {ticketTypeData.map((entry, index) => (
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
          <Card title="退票率趋势">
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={refundData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="退票率" fill="#ff4d4f" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="热销票种排行">
            <Table columns={columns} dataSource={topSellingData} pagination={false} size="small" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

// 需要导入Space组件
import { Space } from 'antd';

export default TicketStatsPage;