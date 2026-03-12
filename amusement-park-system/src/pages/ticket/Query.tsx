import React, { useState } from 'react';
import { Card, Table, Input, Select, DatePicker, Button, Tag, Space, Typography } from 'antd';
import { SearchOutlined, EyeOutlined, PrinterOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const TicketQueryPage: React.FC = () => {
  const [loading] = useState(false);

  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '票种',
      dataIndex: 'ticketType',
      key: 'ticketType',
    },
    {
      title: '客户姓名',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `¥${amount}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          'valid': 'green',
          'used': 'blue',
          'refunded': 'red',
          'expired': 'gray'
        };
        const textMap: Record<string, string> = {
          'valid': '有效',
          'used': '已使用',
          'refunded': '已退票',
          'expired': '已过期'
        };
        return <Tag color={colorMap[status]}>{textMap[status]}</Tag>;
      }
    },
    {
      title: '购买时间',
      dataIndex: 'purchaseTime',
      key: 'purchaseTime',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link" icon={<EyeOutlined />}>查看</Button>
          <Button type="link" icon={<PrinterOutlined />}>打印</Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      orderNo: 'TK202403100001',
      ticketType: '成人票',
      customerName: '张三',
      phone: '138****1234',
      quantity: 2,
      amount: 240,
      status: 'valid',
      purchaseTime: '2024-03-10 09:30:00',
    },
    {
      key: '2',
      orderNo: 'TK202403100002',
      ticketType: '儿童票',
      customerName: '李四',
      phone: '139****5678',
      quantity: 1,
      amount: 60,
      status: 'used',
      purchaseTime: '2024-03-10 10:15:00',
    },
    {
      key: '3',
      orderNo: 'TK202403100003',
      ticketType: '家庭套餐',
      customerName: '王五',
      phone: '137****9012',
      quantity: 1,
      amount: 280,
      status: 'valid',
      purchaseTime: '2024-03-10 11:00:00',
    },
  ];

  return (
    <div>
      <Title level={4}>票务查询</Title>
      
      <Card style={{ marginBottom: 24 }}>
        <Space size="middle" wrap>
          <Input 
            placeholder="订单号/客户姓名/手机号" 
            prefix={<SearchOutlined />}
            style={{ width: 250 }}
          />
          <Select placeholder="票种" style={{ width: 120 }}>
            <Option value="adult">成人票</Option>
            <Option value="child">儿童票</Option>
            <Option value="senior">老人票</Option>
            <Option value="student">学生票</Option>
            <Option value="family">家庭套餐</Option>
          </Select>
          <Select placeholder="状态" style={{ width: 120 }}>
            <Option value="valid">有效</Option>
            <Option value="used">已使用</Option>
            <Option value="refunded">已退票</Option>
            <Option value="expired">已过期</Option>
          </Select>
          <RangePicker />
          <Button type="primary" icon={<SearchOutlined />}>查询</Button>
          <Button>重置</Button>
        </Space>
      </Card>

      <Card>
        <Table 
          columns={columns} 
          dataSource={data}
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default TicketQueryPage;