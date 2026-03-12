import React, { useState } from 'react';
import { Card, Table, Button, Tag, Space, Modal, Form, Input, InputNumber, Select, Switch, message, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const TicketPackagePage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: '套餐名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '包含内容',
      dataIndex: 'content',
      key: 'content',
      render: (content: string) => (
        <Text ellipsis style={{ maxWidth: 200 }} title={content}>
          {content}
        </Text>
      ),
    },
    {
      title: '原价',
      dataIndex: 'originalPrice',
      key: 'originalPrice',
      render: (price: number) => `¥${price}`,
    },
    {
      title: '现价',
      dataIndex: 'currentPrice',
      key: 'currentPrice',
      render: (price: number) => <Text strong type="danger">¥{price}</Text>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'on' ? 'green' : 'red'}>
          {status === 'on' ? '上架' : '下架'}
        </Tag>
      ),
    },
    {
      title: '销量',
      dataIndex: 'sales',
      key: 'sales',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" icon={<EyeOutlined />}>查看</Button>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>编辑</Button>
          <Button type="link" danger icon={<DeleteOutlined />}>删除</Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: '家庭欢乐套餐',
      content: '2张成人票 + 1张儿童票 + 3份餐饮',
      originalPrice: 380,
      currentPrice: 280,
      status: 'on',
      sales: 1256,
    },
    {
      key: '2',
      name: '情侣浪漫套餐',
      content: '2张成人票 + 2份餐饮 + 纪念品',
      originalPrice: 320,
      currentPrice: 220,
      status: 'on',
      sales: 892,
    },
    {
      key: '3',
      name: 'VIP尊享套餐',
      content: 'VIP通票 + 快速通道 + 专属休息区',
      originalPrice: 450,
      currentPrice: 350,
      status: 'off',
      sales: 456,
    },
  ];

  const handleAdd = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: any) => {
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      console.log('Form values:', values);
      message.success('保存成功！');
      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <Title level={4}>套餐设置</Title>
      
      <Card style={{ marginBottom: 24 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增套餐
        </Button>
      </Card>

      <Card>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
      </Card>

      <Modal
        title="套餐设置"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="套餐名称"
            rules={[{ required: true, message: '请输入套餐名称!' }]}
          >
            <Input placeholder="请输入套餐名称" />
          </Form.Item>

          <Form.Item
            name="content"
            label="包含内容"
            rules={[{ required: true, message: '请输入包含内容!' }]}
          >
            <TextArea rows={3} placeholder="请输入包含内容" />
          </Form.Item>

          <Form.Item label="价格设置" required>
            <Space>
              <Form.Item
                name="originalPrice"
                rules={[{ required: true, message: '请输入原价!' }]}
                style={{ marginBottom: 0 }}
              >
                <InputNumber 
                  prefix="¥" 
                  placeholder="原价" 
                  style={{ width: 150 }}
                  min={0}
                />
              </Form.Item>
              <Form.Item
                name="currentPrice"
                rules={[{ required: true, message: '请输入现价!' }]}
                style={{ marginBottom: 0 }}
              >
                <InputNumber 
                  prefix="¥" 
                  placeholder="现价" 
                  style={{ width: 150 }}
                  min={0}
                />
              </Form.Item>
            </Space>
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch checkedChildren="上架" unCheckedChildren="下架" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TicketPackagePage;