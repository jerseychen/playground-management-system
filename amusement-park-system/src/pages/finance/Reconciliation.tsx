import React from 'react';
import { Card, Table, DatePicker, Button, Tag, Space, Typography, Row, Col, Statistic, Progress } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, SyncOutlined, SearchOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const FinanceReconciliationPage: React.FC = () => {
  const columns = [
    {
      title: '对账日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '系统收入',
      dataIndex: 'systemAmount',
      key: 'systemAmount',
      render: (amount: number) => `¥${amount.toLocaleString()}`,
    },
    {
      title: '实际收入',
      dataIndex: 'actualAmount',
      key: 'actualAmount',
      render: (amount: number) => `¥${amount.toLocaleString()}`,
    },
    {
      title: '差异',
      dataIndex: 'difference',
      key: 'difference',
      render: (diff: number) => (
        <span style={{ color: diff === 0 ? '#52c41a' : '#f5222d' }}>
          {diff === 0 ? '平' : `¥${diff}`}
        </span>
      ),
    },
    {
      title: '对账状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          'matched': 'green',
          'unmatched': 'red',
          'pending': 'orange'
        };
        const textMap: Record<string, string> = {
          'matched': '已对平',
          'unmatched': '有差异',
          'pending': '待对账'
        };
        const iconMap: Record<string, React.ReactNode> = {
          'matched': <CheckCircleOutlined />,
          'unmatched': <CloseCircleOutlined />,
          'pending': <SyncOutlined spin />
        };
        return (
          <Tag color={colorMap[status]} icon={iconMap[status]}>
            {textMap[status]}
          </Tag>
        );
      }
    },
    {
      title: '对账人',
      dataIndex: 'operator',
      key: 'operator',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link">查看明细</Button>
          {record.status === 'pending' && (
            <Button type="primary" size="small">开始对账</Button>
          )}
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      date: '2024-03-10',
      systemAmount: 65800,
      actualAmount: 65800,
      difference: 0,
      status: 'matched',
      operator: '财务A',
    },
    {
      key: '2',
      date: '2024-03-09',
      systemAmount: 52300,
      actualAmount: 52200,
      difference: -100,
      status: 'unmatched',
      operator: '财务B',
    },
    {
      key: '3',
      date: '2024-03-08',
      systemAmount: 61200,
      actualAmount: 61200,
      difference: 0,
      status: 'matched',
      operator: '财务A',
    },
  ];

  return (
    <div>
      <Title level={4}>对账管理</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="已对平"
              value={28}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="有差异"
              value={2}
              valueStyle={{ color: '#f5222d' }}
              prefix={<CloseCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="待对账"
              value={1}
              valueStyle={{ color: '#faad14' }}
              prefix={<SyncOutlined spin />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ marginBottom: 8 }}>对账准确率</div>
            <Progress percent={93.3} status="active" />
          </Card>
        </Col>
      </Row>
      
      <Card style={{ marginBottom: 24 }}>
        <Space size="middle">
          <RangePicker />
          <Button type="primary" icon={<SearchOutlined />}>查询</Button>
          <Button type="primary" icon={<SyncOutlined />}>批量对账</Button>
        </Space>
      </Card>

      <Card>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
};

export default FinanceReconciliationPage;