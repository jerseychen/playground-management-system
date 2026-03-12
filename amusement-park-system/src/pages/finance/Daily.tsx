import React, { useState } from 'react';
import { Card, Table, DatePicker, Select, Button, Tag, Space, Typography, Row, Col, Statistic } from 'antd';
import { SearchOutlined, PlusOutlined, ArrowUpOutlined, ArrowDownOutlined, WalletOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const FinanceDailyPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'income' ? 'green' : 'red'}>
          {type === 'income' ? '收入' : '支出'}
        </Tag>
      ),
    },
    {
      title: '类别',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number, record: any) => (
        <span style={{ color: record.type === 'income' ? '#52c41a' : '#f5222d' }}>
          {record.type === 'income' ? '+' : '-'}{amount}
        </span>
      ),
    },
    {
      title: '项目',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: '经手人',
      dataIndex: 'operator',
      key: 'operator',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link">查看</Button>
          <Button type="link">编辑</Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      time: '2024-03-10 15:30:00',
      type: 'income',
      category: '门票收入',
      amount: 240,
      item: '成人票2张',
      operator: '收银员A',
      remark: '',
    },
    {
      key: '2',
      time: '2024-03-10 14:00:00',
      type: 'income',
      category: '商品销售',
      amount: 89,
      item: '纪念T恤',
      operator: '收银员B',
      remark: '',
    },
    {
      key: '3',
      time: '2024-03-10 12:00:00',
      type: 'expense',
      category: '采购支出',
      amount: 5000,
      item: '冰淇淋原料采购',
      operator: '采购员',
      remark: '供应商B',
    },
  ];

  return (
    <div>
      <Title level={4}>日常收支</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="今日收入"
              value={65800}
              prefix="¥"
              valueStyle={{ color: '#52c41a' }}
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="今日支出"
              value={12500}
              prefix="¥"
              valueStyle={{ color: '#f5222d' }}
              suffix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="今日结余"
              value={53300}
              prefix="¥"
            />
          </Card>
        </Col>
      </Row>
      
      <Card style={{ marginBottom: 24 }}>
        <Space size="middle" wrap>
          <RangePicker />
          <Select placeholder="收支类型" style={{ width: 120 }}>
            <Option value="income">收入</Option>
            <Option value="expense">支出</Option>
          </Select>
          <Select placeholder="类别" style={{ width: 120 }}>
            <Option value="ticket">门票收入</Option>
            <Option value="product">商品销售</Option>
            <Option value="purchase">采购支出</Option>
            <Option value="salary">工资支出</Option>
          </Select>
          <Button type="primary" icon={<SearchOutlined />}>查询</Button>
          <Button>重置</Button>
          <Button type="primary" icon={<PlusOutlined />}>记一笔</Button>
        </Space>
      </Card>

      <Card>
        <Table 
          columns={columns} 
          dataSource={data}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default FinanceDailyPage;