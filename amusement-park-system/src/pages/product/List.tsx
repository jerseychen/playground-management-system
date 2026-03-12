import React, { useState } from 'react';
import { Card, Table, Input, Select, Button, Tag, Space, Image, Typography } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const ProductListPage: React.FC = () => {
  const [loading] = useState(false);

  const columns = [
    {
      title: '商品图片',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
        <Image src={image} width={60} height={60} style={{ objectFit: 'cover' }} />
      ),
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '售价',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `¥${price}`,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => (
        <span style={{ color: stock < 10 ? '#f5222d' : 'inherit' }}>{stock}</span>
      ),
    },
    {
      title: '销量',
      dataIndex: 'sales',
      key: 'sales',
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
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link" icon={<EditOutlined />}>编辑</Button>
          <Button type="link" danger icon={<DeleteOutlined />}>删除</Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      image: 'https://via.placeholder.com/60',
      name: '游乐园纪念T恤',
      category: '纪念品',
      price: 89,
      stock: 156,
      sales: 230,
      status: 'on',
    },
    {
      key: '2',
      image: 'https://via.placeholder.com/60',
      name: '卡通玩偶',
      category: '玩具',
      price: 68,
      stock: 8,
      sales: 456,
      status: 'on',
    },
    {
      key: '3',
      image: 'https://via.placeholder.com/60',
      name: '冰淇淋',
      category: '食品',
      price: 15,
      stock: 200,
      sales: 1200,
      status: 'on',
    },
  ];

  return (
    <div>
      <Title level={4}>商品列表</Title>
      
      <Card style={{ marginBottom: 24 }}>
        <Space size="middle" wrap>
          <Input 
            placeholder="商品名称/编号" 
            prefix={<SearchOutlined />}
            style={{ width: 250 }}
          />
          <Select placeholder="分类" style={{ width: 120 }}>
            <Option value="souvenir">纪念品</Option>
            <Option value="toy">玩具</Option>
            <Option value="food">食品</Option>
            <Option value="drink">饮料</Option>
          </Select>
          <Select placeholder="状态" style={{ width: 120 }}>
            <Option value="on">上架</Option>
            <Option value="off">下架</Option>
          </Select>
          <Button type="primary" icon={<SearchOutlined />}>查询</Button>
          <Button>重置</Button>
          <Button type="primary" icon={<PlusOutlined />}>新增商品</Button>
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

export default ProductListPage;