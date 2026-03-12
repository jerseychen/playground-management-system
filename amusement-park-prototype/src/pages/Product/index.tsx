import React, { useState } from 'react';
import { Card, Row, Col, Button, Form, Input, Select, Table, Tag, Space, InputNumber, Tabs, Image } from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
  ShoppingOutlined,
  BarChartOutlined,
  InboxOutlined,
  TagOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { TabPane } = Tabs;

// 商品管理首页 - 基于油菜花系统观察设计
const ProductManagement: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('list');

  // 商品数据模拟
  const productData = [
    {
      key: '1',
      image: '🍔',
      name: '欢乐套餐',
      sku: 'PD1001',
      category: '餐饮',
      price: '¥48',
      stock: 156,
      sales: 289,
      status: '在售',
    },
    {
      key: '2',
      image: '🥤',
      name: '可乐饮料',
      sku: 'PD1002',
      category: '饮料',
      price: '¥8',
      stock: 420,
      sales: 856,
      status: '在售',
    },
    {
      key: '3',
      image: '🎁',
      name: '纪念公仔',
      sku: 'PD1003',
      category: '纪念品',
      price: '¥68',
      stock: 89,
      sales: 156,
      status: '在售',
    },
    {
      key: '4',
      image: '🧢',
      name: '主题帽子',
      sku: 'PD1004',
      category: '服饰',
      price: '¥38',
      stock: 0,
      sales: 203,
      status: '缺货',
    },
    {
      key: '5',
      image: '📷',
      name: '照片打印',
      sku: 'PD1005',
      category: '服务',
      price: '¥20',
      stock: 999,
      sales: 420,
      status: '在售',
    },
  ];

  const columns = [
    {
      title: '商品',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 6,
            background: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
          }}>
            {record.image}
          </div>
          <div>
            <div style={{ fontWeight: '500' }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#999' }}>{record.sku}</div>
          </div>
        </Space>
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number, record: any) => (
        <div style={{ color: stock === 0 ? '#ff4d4f' : stock < 10 ? '#fa8c16' : '#52c41a' }}>
          {stock}件
        </div>
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
        <Tag color={status === '在售' ? 'success' : 'error'}>{status}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EditOutlined />}>
            编辑
          </Button>
          <Button type="link" size="small">
            入库
          </Button>
          {record.status === '在售' ? (
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              下架
            </Button>
          ) : (
            <Button type="link" size="small" icon={<PlusOutlined />}>
              上架
            </Button>
          )}
        </Space>
      ),
    },
  ];

  // 库存数据
  const inventoryData = [
    {
      key: '1',
      product: '欢乐套餐',
      sku: 'PD1001',
      current: 156,
      min: 20,
      max: 500,
      lastIn: '2026-03-09',
      lastOut: '2026-03-10',
    },
    {
      key: '2',
      product: '可乐饮料',
      sku: 'PD1002',
      current: 420,
      min: 100,
      max: 1000,
      lastIn: '2026-03-10',
      lastOut: '2026-03-10',
    },
    {
      key: '3',
      product: '纪念公仔',
      sku: 'PD1003',
      current: 89,
      min: 30,
      max: 200,
      lastIn: '2026-03-08',
      lastOut: '2026-03-10',
    },
    {
      key: '4',
      product: '主题帽子',
      sku: 'PD1004',
      current: 0,
      min: 20,
      max: 100,
      lastIn: '2026-02-28',
      lastOut: '2026-03-09',
    },
    {
      key: '5',
      product: '照片打印',
      sku: 'PD1005',
      current: 999,
      min: 0,
      max: 1000,
      lastIn: '2026-03-10',
      lastOut: '2026-03-10',
    },
  ];

  const inventoryColumns = [
    {
      title: '商品',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: '当前库存',
      dataIndex: 'current',
      key: 'current',
      render: (current: number) => (
        <div style={{ fontWeight: 'bold', color: current === 0 ? '#ff4d4f' : '#1890ff' }}>
          {current}件
        </div>
      ),
    },
    {
      title: '库存范围',
      key: 'range',
      render: (_: any, record: any) => `${record.min}~${record.max}`,
    },
    {
      title: '最后入库',
      dataIndex: 'lastIn',
      key: 'lastIn',
    },
    {
      title: '最后出库',
      dataIndex: 'lastOut',
      key: 'lastOut',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="small">
          <Button type="link" size="small">补货</Button>
          <Button type="link" size="small">调拨</Button>
        </Space>
      ),
    },
  ];

  // 销售统计
  const salesStats = {
    todaySales: 15620,
    todayVolume: 289,
    monthSales: 245800,
    monthVolume: 4289,
    hotProduct: '可乐饮料',
    hotCategory: '餐饮',
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: 8 }}>商品管理</h1>
        <p style={{ color: '#666' }}>管理商品信息、库存、采购及销售数据</p>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ marginBottom: 24 }}>
        <TabPane tab="商品列表" key="list" icon={<ShoppingOutlined />} />
        <TabPane tab="库存管理" key="inventory" icon={<InboxOutlined />} />
        <TabPane tab="采购管理" key="purchase" icon={<PlusOutlined />} />
        <TabPane tab="销售统计" key="sales" icon={<BarChartOutlined />} />
        <TabPane tab="商品分类" key="category" icon={<TagOutlined />} />
      </Tabs>

      {activeTab === 'list' && (
        <>
          <Card 
            title="商品列表" 
            extra={
              <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/product/list/create')}>
                  新增商品
                </Button>
                <Button icon={<ReloadOutlined />}>导入</Button>
              </Space>
            }
            style={{ marginBottom: 16 }}
          >
            <Form layout="inline" style={{ marginBottom: 16 }}>
              <Form.Item label="商品信息">
                <Input placeholder="名称/SKU" />
              </Form.Item>
              <Form.Item label="分类">
                <Select placeholder="全部分类" style={{ width: 120 }}>
                  <Option value="all">全部</Option>
                  <Option value="food">餐饮</Option>
                  <Option value="drink">饮料</Option>
                  <Option value="souvenir">纪念品</Option>
                </Select>
              </Form.Item>
              <Form.Item label="状态">
                <Select placeholder="全部状态" style={{ width: 120 }}>
                  <Option value="all">全部</Option>
                  <Option value="onsale">在售</Option>
                  <Option value="outofstock">缺货</Option>
                  <Option value="off">下架</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" icon={<SearchOutlined />}>查询</Button>
              </Form.Item>
              <Form.Item>
                <Button icon={<ReloadOutlined />}>重置</Button>
              </Form.Item>
            </Form>
            
            <Table 
              columns={columns} 
              dataSource={productData}
              pagination={{ pageSize: 10 }}
            />
          </Card>

          <Row gutter={16}>
            <Col span={8}>
              <Card size="small">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1890ff' }}>
                    {productData.length}
                  </div>
                  <div style={{ color: '#666' }}>商品总数</div>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card size="small">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#52c41a' }}>
                    {productData.filter(p => p.status === '在售').length}
                  </div>
                  <div style={{ color: '#666' }}>在售商品</div>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card size="small">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fa8c16' }}>
                    {productData.filter(p => p.stock < 10).length}
                  </div>
                  <div style={{ color: '#666' }}>库存预警</div>
                </div>
              </Card>
            </Col>
          </Row>
        </>
      )}

      {activeTab === 'inventory' && (
        <Card title="库存管理">
          <Table 
            columns={inventoryColumns} 
            dataSource={inventoryData}
            pagination={{ pageSize: 10 }}
          />
          
          <div style={{ marginTop: 24 }}>
            <h3 style={{ marginBottom: 16 }}>库存预警</h3>
            <Row gutter={[16, 16]}>
              {inventoryData.filter(item => item.current === 0).map(item => (
                <Col span={8} key={item.key}>
                  <Card size="small" style={{ borderColor: '#ff4d4f' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '500' }}>{item.product}</div>
                        <div style={{ fontSize: '12px', color: '#999' }}>{item.sku}</div>
                      </div>
                      <Tag color="error">缺货</Tag>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Card>
      )}

      {activeTab === 'sales' && (
        <Card title="销售统计">
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card size="small">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1890ff' }}>
                    ¥{salesStats.todaySales.toLocaleString()}
                  </div>
                  <div style={{ color: '#666' }}>今日销售额</div>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#52c41a' }}>
                    {salesStats.todayVolume}
                  </div>
                  <div style={{ color: '#666' }}>今日销售量</div>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fa8c16' }}>
                    ¥{salesStats.monthSales.toLocaleString()}
                  </div>
                  <div style={{ color: '#666' }}>本月销售额</div>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#722ed1' }}>
                    {salesStats.monthVolume}
                  </div>
                  <div style={{ color: '#666' }}>本月销售量</div>
                </div>
              </Card>
            </Col>
          </Row>

          <div style={{ marginTop: 24 }}>
            <h3 style={{ marginBottom: 16 }}>热销商品</h3>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: 8 }}>🥤</div>
                    <h3 style={{ margin: 0 }}>{salesStats.hotProduct}</h3>
                    <p style={{ color: '#666' }}>今日销量：289件</p>
                    <Tag color="orange">最热销</Tag>
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: 8 }}>🍔</div>
                    <h3 style={{ margin: 0 }}>欢乐套餐</h3>
                    <p style={{ color: '#666' }}>今日销量：156件</p>
                    <Tag color="blue">高毛利</Tag>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </Card>
      )}

      {activeTab === 'category' && (
        <Card title="商品分类">
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card 
                hoverable
                style={{ textAlign: 'center' }}
                onClick={() => navigate('/product/category/food')}
              >
                <div style={{ fontSize: '32px', marginBottom: 8 }}>🍔</div>
                <h4 style={{ margin: 0 }}>餐饮</h4>
                <p style={{ color: '#666', fontSize: '12px' }}>12个商品</p>
              </Card>
            </Col>
            <Col span={6}>
              <Card 
                hoverable
                style={{ textAlign: 'center' }}
                onClick={() => navigate('/product/category/drink')}
              >
                <div style={{ fontSize: '32px', marginBottom: 8 }}>🥤</div>
                <h4 style={{ margin: 0 }}>饮料</h4>
                <p style={{ color: '#666', fontSize: '12px' }}>8个商品</p>
              </Card>
            </Col>
            <Col span={6}>
              <Card 
                hoverable
                style={{ textAlign: 'center' }}
                onClick={() => navigate('/product/category/souvenir')}
              >
                <div style={{ fontSize: '32px', marginBottom: 8 }}>🎁</div>
                <h4 style={{ margin: 0 }}>纪念品</h4>
                <p style={{ color: '#666', fontSize: '12px' }}>15个商品</p>
              </Card>
            </Col>
            <Col span={6}>
              <Card 
                hoverable
                style={{ textAlign: 'center' }}
                onClick={() => navigate('/product/category/clothing')}
              >
                <div style={{ fontSize: '32px', marginBottom: 8 }}>👕</div>
                <h4 style={{ margin: 0 }}>服饰</h4>
                <p style={{ color: '#666', fontSize: '12px' }}>6个商品</p>
              </Card>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
};

export default ProductManagement;