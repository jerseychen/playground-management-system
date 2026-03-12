import React from 'react';
import { Card, Row, Col, Statistic, DatePicker, Button, Table, Typography } from 'antd';
import { DownloadOutlined, FileTextOutlined } from '@ant-design/icons';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const monthlyData = [
  { month: '1月', 收入: 450000, 支出: 280000, 利润: 170000 },
  { month: '2月', 收入: 520000, 支出: 300000, 利润: 220000 },
  { month: '3月', 收入: 680000, 支出: 350000, 利润: 330000 },
  { month: '4月', 收入: 720000, 支出: 380000, 利润: 340000 },
  { month: '5月', 收入: 850000, 支出: 420000, 利润: 430000 },
  { month: '6月', 收入: 920000, 支出: 450000, 利润: 470000 },
];

const categoryData = [
  { category: '门票收入', amount: 450000, percentage: '52%' },
  { category: '商品销售', amount: 180000, percentage: '21%' },
  { category: '餐饮服务', amount: 120000, percentage: '14%' },
  { category: '会员充值', amount: 80000, percentage: '9%' },
  { category: '其他收入', amount: 40000, percentage: '4%' },
];

const FinanceReportsPage: React.FC = () => {
  const columns = [
    { title: '项目', dataIndex: 'category', key: 'category' },
    { title: '金额', dataIndex: 'amount', key: 'amount', render: (val: number) => `¥${val.toLocaleString()}` },
    { title: '占比', dataIndex: 'percentage', key: 'percentage' },
  ];

  return (
    <div>
      <Title level={4}>财务报表</Title>

      <Card style={{ marginBottom: 24 }}>
        <RangePicker style={{ marginRight: 16 }} />
        <Button type="primary" icon={<DownloadOutlined />}>导出报表</Button>
      </Card>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总收入"
              value={4140000}
              prefix="¥"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总支出"
              value={2180000}
              prefix="¥"
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="净利润"
              value={1960000}
              prefix="¥"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="利润率"
              value={47.3}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={16}>
          <Card title="收支趋势">
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="收入" stroke="#52c41a" strokeWidth={2} />
                  <Line type="monotone" dataKey="支出" stroke="#f5222d" strokeWidth={2} />
                  <Line type="monotone" dataKey="利润" stroke="#1890ff" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="收入构成">
            <Table columns={columns} dataSource={categoryData} pagination={false} size="small" />
          </Card>
        </Col>
      </Row>

      <Card title="报表下载">
        <Button icon={<FileTextOutlined />} style={{ marginRight: 16 }}>月度收支报表</Button>
        <Button icon={<FileTextOutlined />} style={{ marginRight: 16 }}>年度财务报表</Button>
        <Button icon={<FileTextOutlined />}>税务报表</Button>
      </Card>
    </div>
  );
};

export default FinanceReportsPage;