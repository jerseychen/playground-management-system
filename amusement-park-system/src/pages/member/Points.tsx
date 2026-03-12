import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Button, Typography, Divider } from 'antd';
import { GiftOutlined, HistoryOutlined, SettingOutlined } from '@ant-design/icons';

const { Title } = Typography;

const MemberPointsPage: React.FC = () => {
  const columns = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '会员',
      dataIndex: 'memberName',
      key: 'memberName',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'earn' ? 'green' : 'red'}>
          {type === 'earn' ? '获得' : '消费'}
        </Tag>
      ),
    },
    {
      title: '积分',
      dataIndex: 'points',
      key: 'points',
      render: (points: number, record: any) => (
        <span style={{ color: record.type === 'earn' ? '#52c41a' : '#f5222d' }}>
          {record.type === 'earn' ? '+' : '-'}{points}
        </span>
      ),
    },
    {
      title: '来源/用途',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
  ];

  const data = [
    {
      key: '1',
      time: '2024-03-10 14:30:00',
      memberName: '张三',
      type: 'earn',
      points: 100,
      source: '购票消费',
      remark: '购买成人票2张',
    },
    {
      key: '2',
      time: '2024-03-10 12:15:00',
      memberName: '李四',
      type: 'consume',
      points: 500,
      source: '积分兑换',
      remark: '兑换纪念品',
    },
    {
      key: '3',
      time: '2024-03-10 10:00:00',
      memberName: '王五',
      type: 'earn',
      points: 200,
      source: '签到奖励',
      remark: '每日签到',
    },
  ];

  const exchangeColumns = [
    {
      title: '礼品名称',
      dataIndex: 'giftName',
      key: 'giftName',
    },
    {
      title: '所需积分',
      dataIndex: 'requiredPoints',
      key: 'requiredPoints',
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'available' ? 'green' : 'red'}>
          {status === 'available' ? '可兑换' : '已兑完'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: () => <Button type="link">编辑</Button>,
    },
  ];

  const exchangeData = [
    { key: '1', giftName: '游乐园纪念T恤', requiredPoints: 1000, stock: 50, status: 'available' },
    { key: '2', giftName: '免费门票', requiredPoints: 2000, stock: 20, status: 'available' },
    { key: '3', giftName: 'VIP体验券', requiredPoints: 5000, stock: 0, status: 'out' },
  ];

  return (
    <div>
      <Title level={4}>积分管理</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总积分发放"
              value={125800}
              prefix={<GiftOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总积分消费"
              value={45200}
              prefix={<HistoryOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="积分余额"
              value={80600}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="兑换次数"
              value={1256}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={16}>
          <Card title="积分变动记录">
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card 
            title="积分兑换设置" 
            extra={<Button type="primary" size="small">新增礼品</Button>}
          >
            <Table 
              columns={exchangeColumns} 
              dataSource={exchangeData} 
              pagination={false}
              size="small"
            />
            <Divider />
            <div>
              <Title level={5}>积分规则</Title>
              <p>消费1元 = 1积分</p>
              <p>每日签到 = 10积分</p>
              <p>生日双倍积分</p>
              <Button icon={<SettingOutlined />} block>编辑规则</Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MemberPointsPage;