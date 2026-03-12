import React, { useState } from 'react';
import { Card, Table, Button, Tag, Space, Modal, Form, Input, Select, DatePicker, message, Typography } from 'antd';
import { PlusOutlined, CheckOutlined, CloseOutlined, EyeOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const ProductPurchasePage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: '采购单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '供应商',
      dataIndex: 'supplier',
      key: 'supplier',
    },
    {
      title: '商品',
      dataIndex: 'product',
      key: 'product',
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
          'pending': 'orange',
          'approved': 'blue',
          'completed': 'green',
          'rejected': 'red'
        };
        const textMap: Record<string, string> = {
          'pending': '待审批',
          'approved': '已批准',
          'completed': '已完成',
          'rejected': '已拒绝'
        };
        return <Tag color={colorMap[status]}>{textMap[status]}</Tag>;
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" icon={<EyeOutlined />}>查看</Button>
          {record.status === 'pending' && (
            <>
              <Button type="link" icon={<CheckOutlined />}>批准</Button>
              <Button type="link" danger icon={<CloseOutlined />}>拒绝</Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      orderNo: 'PO202403100001',
      supplier: '玩具供应商A',
      product: '卡通玩偶',
      quantity: 200,
      amount: 8000,
      status: 'pending',
    },
    {
      key: '2',
      orderNo: 'PO202403090002',
      supplier: '食品供应商B',
      product: '冰淇淋原料',
      quantity: 500,
      amount: 5000,
      status: 'approved',
    },
    {
      key: '3',
      orderNo: 'PO202403080003',
      supplier: '服装供应商C',
      product: '纪念T恤',
      quantity: 300,
      amount: 12000,
      status: 'completed',
    },
  ];

  const handleAdd = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      console.log('Form values:', values);
      message.success('采购申请提交成功！');
      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <Title level={4}>采购管理</Title>
      
      <Card style={{ marginBottom: 24 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增采购
        </Button>
      </Card>

      <Card>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
      </Card>

      <Modal
        title="新增采购申请"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="supplier"
            label="供应商"
            rules={[{ required: true, message: '请选择供应商!' }]}
          >
            <Select placeholder="请选择供应商">
              <Option value="supplier1">玩具供应商A</Option>
              <Option value="supplier2">食品供应商B</Option>
              <Option value="supplier3">服装供应商C</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="product"
            label="商品"
            rules={[{ required: true, message: '请输入商品名称!' }]}
          >
            <Input placeholder="请输入商品名称" />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="数量"
            rules={[{ required: true, message: '请输入数量!' }]}
          >
            <Input type="number" placeholder="请输入数量" />
          </Form.Item>

          <Form.Item
            name="amount"
            label="金额"
            rules={[{ required: true, message: '请输入金额!' }]}
          >
            <Input type="number" prefix="¥" placeholder="请输入金额" />
          </Form.Item>

          <Form.Item
            name="remark"
            label="备注"
          >
            <TextArea rows={3} placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductPurchasePage;