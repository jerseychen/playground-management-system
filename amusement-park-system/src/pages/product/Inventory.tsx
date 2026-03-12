import React from 'react';
import { Card, Table, Tag, Button, Progress, Typography, Row, Col, Statistic } from 'antd';
import { WarningOutlined, CheckCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ProductInventoryPage: React.FC = () => {
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '当前库存',
      dataIndex: 'current',
      key: 'current',
    },
    {
      title: '安全库存',
      dataIndex: 'safety',
      key: 'safety',
    },
    {
      title: '库存状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          'normal': 'green',
          'warning': 'orange',
          'danger': 'red'
        };
        const textMap: Record<string, string> = {
          'normal': '正常',
          'warning': '偏低',
          'danger': '不足'
        };
        return <Tag color={colorMap[status]}>{textMap[status]}</Tag>;
      }
    },
    {
      title: '库存占比',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (percentage: number, record: any) => (
        <Progress 
          percent={percentage} 
          size="small" 
          status={record.status === 'danger' ? 'exception' : 'normal'}
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Button type="primary" size="small">补货</Button>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: '游乐园纪念T恤',
      current: 156,
      safety: 50,
      status: 'normal',
      percentage: 78,
    },
    {
      key: '2',
      name: '卡通玩偶',
      current: 8,
      safety: 20,
      status: 'danger',
      percentage: 20,
    },
    {
      key: '3',
      name: '冰淇淋',
      current: 200,
      safety: 100,
      status: 'normal',
      percentage: 80,
    },
    {
      key: '4',
      name: '饮料',
      current: 25,
      safety: 50,
      status: 'warning',
      percentage: 50,
    },
  ];

  const recordColumns = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '商品',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'in' ? 'green' : 'red'}>
          {type === 'in' ? '入库' : '出库'}
        </Tag>
      ),
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: '操作人',
      dataIndex: 'operator',
      key: 'operator',
    },
  ];

  const recordData = [
    {
      key: '1',
      time: '2024-03-10 14:30:00',
      product: '卡通玩偶',
      type: 'in',
      quantity: 100,
      operator: '管理员',
    },
    {
      key: '2',
      time: '2024-03-10 12:00:00',
      product: '冰淇淋',
      type: 'out',
      quantity: 50,
      operator: '收银员',
    },
  ];

  return (
    <div>
      <Title level={4}>库存管理</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="总库存商品"
              value={45}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="库存正常"
              value={38}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="库存预警"
              value={7}
              valueStyle={{ color: '#f5222d' }}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={16}>
          <Card title="库存监控">
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="出入库记录">
            <Table columns={recordColumns} dataSource={recordData} pagination={false} size="small" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductInventoryPage;