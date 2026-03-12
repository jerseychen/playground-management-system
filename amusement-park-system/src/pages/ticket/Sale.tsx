import React from 'react';
import { Card, Form, Input, Select, Button, Row, Col, InputNumber, Table, Typography, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const ticketTypes = [
  { id: 1, name: '成人票', price: 120 },
  { id: 2, name: '儿童票', price: 60 },
  { id: 3, name: '老人票', price: 80 },
  { id: 4, name: '学生票', price: 90 },
  { id: 5, name: '家庭套餐(2大1小)', price: 280 },
  { id: 6, name: 'VIP通票', price: 200 },
];

const TicketSalePage: React.FC = () => {
  const [form] = Form.useForm();
  const [cartItems, setCartItems] = React.useState<any[]>([]);

  const onFinish = (values: any) => {
    console.log('Received values:', values);
  };

  const addToCart = () => {
    const values = form.getFieldsValue();
    if (!values.ticketType || !values.quantity) {
      return;
    }

    const ticket = ticketTypes.find(t => t.id === values.ticketType);
    const newItem = {
      key: Date.now(),
      ticketType: ticket?.name,
      price: ticket?.price,
      quantity: values.quantity,
      total: (ticket?.price || 0) * values.quantity,
      customerName: values.customerName,
      customerPhone: values.customerPhone,
    };

    setCartItems([...cartItems, newItem]);
    form.resetFields(['ticketType', 'quantity']);
  };

  const removeFromCart = (key: string) => {
    setCartItems(cartItems.filter(item => item.key !== key));
  };

  const columns = [
    {
      title: '票种',
      dataIndex: 'ticketType',
      key: 'ticketType',
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `¥${price}`,
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: '小计',
      dataIndex: 'total',
      key: 'total',
      render: (total: number) => `¥${total}`,
    },
    {
      title: '客户姓名',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => removeFromCart(record.key)}
        >
          移除
        </Button>
      ),
    },
  ];

  const totalAmount = cartItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div>
      <Title level={4}>快速售票</Title>
      
      <Row gutter={24}>
        <Col span={12}>
          <Card title="选择票种">
            <Form form={form} onFinish={onFinish} layout="vertical">
              <Form.Item
                name="ticketType"
                label="票种选择"
                rules={[{ required: true, message: '请选择票种!' }]}
              >
                <Select placeholder="请选择票种" style={{ width: '100%' }}>
                  {ticketTypes.map(ticket => (
                    <Option key={ticket.id} value={ticket.id}>
                      {ticket.name} - ¥{ticket.price}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="quantity"
                label="数量"
                rules={[{ required: true, message: '请输入数量!' }]}
              >
                <InputNumber 
                  min={1} 
                  max={100} 
                  style={{ width: '100%' }} 
                  placeholder="请输入购票数量"
                />
              </Form.Item>

              <Title level={5} style={{ marginTop: 24 }}>客户信息</Title>
              
              <Form.Item
                name="customerName"
                label="客户姓名"
              >
                <Input placeholder="请输入客户姓名" />
              </Form.Item>

              <Form.Item
                name="customerPhone"
                label="手机号"
                rules={[
                  { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号!' }
                ]}
              >
                <Input placeholder="请输入手机号" />
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={addToCart}
                  block
                >
                  添加到购物车
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col span={12}>
          <Card 
            title="购物车" 
            extra={
              <Space>
                <Text strong>总计: ¥{totalAmount}</Text>
                <Button type="primary" icon={<ShoppingCartOutlined />} size="large">
                  确认出票
                </Button>
              </Space>
            }
          >
            <Table
              columns={columns}
              dataSource={cartItems}
              pagination={false}
              locale={{ emptyText: '购物车为空，请添加票种' }}
              footer={() => (
                <div style={{ textAlign: 'right' }}>
                  <Text strong style={{ fontSize: 16 }}>
                    合计: ¥{totalAmount}
                  </Text>
                </div>
              )}
            />
          </Card>

          <Card title="售票统计" style={{ marginTop: 16 }}>
            <Row gutter={16}>
              <Col span={8}>
                <Card size="small">
                  <Statistic title="今日售票" value={285} />
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small">
                  <Statistic title="今日营收" value={34200} prefix="¥" />
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small">
                  <Statistic title="平均票价" value={120} prefix="¥" />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

// 需要导入Statistic组件
import { Statistic } from 'antd';

export default TicketSalePage;