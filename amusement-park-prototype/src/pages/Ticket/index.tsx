import React, { useState } from 'react';
import { Card, Row, Col, Button, Form, Input, Select, Table, Tag, Space, Modal, Tabs } from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
  QrcodeOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SettingOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { TabPane } = Tabs;

// 票务管理首页 - 基于油菜花系统观察设计
const TicketManagement: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('sell');

  // 票务数据模拟
  const ticketData = [
    {
      key: '1',
      ticketNo: 'T202603100001',
      type: '成人票',
      price: '¥120',
      customer: '张三',
      phone: '138****5678',
      status: '已使用',
      time: '2026-03-10 09:30',
      operator: '王五',
    },
    {
      key: '2',
      ticketNo: 'T202603100002',
      type: '儿童票',
      price: '¥80',
      customer: '李四',
      phone: '139****1234',
      status: '未使用',
      time: '2026-03-10 10:15',
      operator: '王五',
    },
    {
      key: '3',
      ticketNo: 'T202603100003',
      type: '套餐票',
      price: '¥300',
      customer: '王六',
      phone: '136****9876',
      status: '退票中',
      time: '2026-03-10 11:20',
      operator: '赵七',
    },
    {
      key: '4',
      ticketNo: 'T202603100004',
      type: '团体票',
      price: '¥850',
      customer: '阳光幼儿园',
      phone: '135****4321',
      status: '已使用',
      time: '2026-03-10 14:45',
      operator: '孙八',
    },
    {
      key: '5',
      ticketNo: 'T202603100005',
      type: 'VIP票',
      price: '¥200',
      customer: '钱九',
      phone: '137****6543',
      status: '未使用',
      time: '2026-03-10 16:30',
      operator: '王五',
    },
  ];

  const columns = [
    {
      title: '票号',
      dataIndex: 'ticketNo',
      key: 'ticketNo',
    },
    {
      title: '票种',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        let color = '';
        if (type === '成人票') color = 'blue';
        if (type === '儿童票') color = 'green';
        if (type === '套餐票') color = 'purple';
        if (type === '团体票') color = 'orange';
        if (type === 'VIP票') color = 'red';
        return <Tag color={color}>{type}</Tag>;
      },
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '客户',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = '';
        if (status === '已使用') color = 'default';
        if (status === '未使用') color = 'success';
        if (status === '退票中') color = 'warning';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: '购票时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '操作员',
      dataIndex: 'operator',
      key: 'operator',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="link" size="small" icon={<FileTextOutlined />}>
            详情
          </Button>
          {record.status === '未使用' && (
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              退票
            </Button>
          )}
        </Space>
      ),
    },
  ];

  // 套餐数据 - 基于油菜花系统观察
  const packageData = [
    {
      key: '1',
      name: '家庭欢乐套餐',
      price: '¥280',
      content: '2大1小门票+餐饮券',
      validDays: 30,
      sales: 156,
      status: '上架中',
    },
    {
      key: '2',
      name: '学生优惠套餐',
      price: '¥180',
      content: '学生票+纪念品',
      validDays: 7,
      sales: 89,
      status: '上架中',
    },
    {
      key: '3',
      name: '周末畅玩套餐',
      price: '¥350',
      content: '全票种+快速通道',
      validDays: 2,
      sales: 203,
      status: '上架中',
    },
    {
      key: '4',
      name: '团体优惠套餐',
      price: '¥800',
      content: '10人团体票+导游',
      validDays: 90,
      sales: 45,
      status: '已下架',
    },
  ];

  const packageColumns = [
    {
      title: '套餐名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '套餐内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '有效期',
      dataIndex: 'validDays',
      key: 'validDays',
      render: (days: number) => `${days}天`,
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
        <Tag color={status === '上架中' ? 'success' : 'default'}>{status}</Tag>
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
          <Button 
            type="link" 
            size="small" 
            danger={record.status === '上架中'}
            icon={record.status === '上架中' ? <DeleteOutlined /> : <PlusOutlined />}
          >
            {record.status === '上架中' ? '下架' : '上架'}
          </Button>
        </Space>
      ),
    },
  ];

  const handleQuickSell = () => {
    Modal.info({
      title: '快速售票',
      content: (
        <Form form={form} layout="vertical">
          <Form.Item label="票种" name="ticketType" rules={[{ required: true }]}>
            <Select placeholder="请选择票种">
              <Option value="adult">成人票 ¥120</Option>
              <Option value="child">儿童票 ¥80</Option>
              <Option value="vip">VIP票 ¥200</Option>
              <Option value="package">选择套餐</Option>
            </Select>
          </Form.Item>
          <Form.Item label="数量" name="quantity" rules={[{ required: true }]}>
            <Input type="number" min={1} placeholder="请输入数量" />
          </Form.Item>
          <Form.Item label="客户信息" name="customer">
            <Input placeholder="姓名/手机号（可选）" />
          </Form.Item>
        </Form>
      ),
      onOk() {
        console.log('快速售票');
      },
      width: 400,
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: 8 }}>票务管理</h1>
        <p style={{ color: '#666' }}>管理门票销售、查询、退票及套餐设置</p>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ marginBottom: 24 }}>
        <TabPane tab="快速售票" key="sell" icon={<QrcodeOutlined />} />
        <TabPane tab="票务查询" key="query" icon={<SearchOutlined />} />
        <TabPane tab="退票处理" key="refund" icon={<DeleteOutlined />} />
        <TabPane tab="票务统计" key="statistics" icon={<BarChartOutlined />} />
        <TabPane tab="套餐设置" key="package" icon={<SettingOutlined />} />
      </Tabs>

      {activeTab === 'sell' && (
        <Card title="快速售票" extra={
          <Button type="primary" icon={<QrcodeOutlined />} onClick={handleQuickSell}>
            扫码出票
          </Button>
        }>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card 
                hoverable
                style={{ textAlign: 'center', borderRadius: 8 }}
                onClick={() => navigate('/ticket/sell?type=adult')}
              >
                <div style={{ fontSize: '32px', marginBottom: 8 }}>🎫</div>
                <h3>成人票</h3>
                <p style={{ color: '#1890ff', fontSize: '18px', fontWeight: 'bold' }}>¥120</p>
                <p style={{ color: '#999', fontSize: '12px' }}>标准成人门票</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card 
                hoverable
                style={{ textAlign: 'center', borderRadius: 8 }}
                onClick={() => navigate('/ticket/sell?type=child')}
              >
                <div style={{ fontSize: '32px', marginBottom: 8 }}>👶</div>
                <h3>儿童票</h3>
                <p style={{ color: '#52c41a', fontSize: '18px', fontWeight: 'bold' }}>¥80</p>
                <p style={{ color: '#999', fontSize: '12px' }}>1.2-1.5米儿童</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card 
                hoverable
                style={{ textAlign: 'center', borderRadius: 8 }}
                onClick={() => navigate('/ticket/sell?type=vip')}
              >
                <div style={{ fontSize: '32px', marginBottom: 8 }}>⭐</div>
                <h3>VIP票</h3>
                <p style={{ color: '#fa8c16', fontSize: '18px', fontWeight: 'bold' }}>¥200</p>
                <p style={{ color: '#999', fontSize: '12px' }}>快速通道+纪念品</p>
              </Card>
            </Col>
          </Row>
          
          <div style={{ marginTop: 24 }}>
            <h3 style={{ marginBottom: 16 }}>推荐套餐</h3>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card 
                  hoverable
                  onClick={() => navigate('/ticket/package')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ margin: 0 }}>家庭欢乐套餐</h4>
                      <p style={{ color: '#666', margin: '4px 0' }}>2大1小门票+餐饮券</p>
                      <p style={{ color: '#1890ff', fontSize: '18px', fontWeight: 'bold' }}>¥280</p>
                    </div>
                    <Tag color="success">热销</Tag>
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card 
                  hoverable
                  onClick={() => navigate('/ticket/package')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ margin: 0 }}>周末畅玩套餐</h4>
                      <p style={{ color: '#666', margin: '4px 0' }}>全票种+快速通道</p>
                      <p style={{ color: '#1890ff', fontSize: '18px', fontWeight: 'bold' }}>¥350</p>
                    </div>
                    <Tag color="orange">推荐</Tag>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </Card>
      )}

      {activeTab === 'query' && (
        <Card title="票务查询">
          <Form layout="inline" style={{ marginBottom: 16 }}>
            <Form.Item label="票号">
              <Input placeholder="输入票号查询" />
            </Form.Item>
            <Form.Item label="客户信息">
              <Input placeholder="姓名/手机号" />
            </Form.Item>
            <Form.Item label="票种">
              <Select placeholder="全部票种" style={{ width: 120 }}>
                <Option value="all">全部</Option>
                <Option value="adult">成人票</Option>
                <Option value="child">儿童票</Option>
                <Option value="package">套餐票</Option>
              </Select>
            </Form.Item>
            <Form.Item label="状态">
              <Select placeholder="全部状态" style={{ width: 120 }}>
                <Option value="all">全部</Option>
                <Option value="used">已使用</Option>
                <Option value="unused">未使用</Option>
                <Option value="refunding">退票中</Option>
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
            dataSource={ticketData}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      )}

      {activeTab === 'package' && (
        <Card 
          title="套餐设置" 
          extra={
            <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/ticket/package/create')}>
              新增套餐
            </Button>
          }
        >
          <Table 
            columns={packageColumns} 
            dataSource={packageData}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      )}

      {activeTab === 'statistics' && (
        <Card title="票务统计">
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card size="small">
                <Statistic
                  title="今日售票金额"
                  value={68420}
                  prefix="¥"
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small">
                <Statistic
                  title="今日售票数量"
                  value={2847}
                  suffix="张"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small">
                <Statistic
                  title="套餐销售占比"
                  value={42.5}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small">
                <Statistic
                  title="退票率"
                  value={2.3}
                  suffix="%"
                  valueStyle={{ color: '#cf1322' }}
                />
              </Card>
            </Col>
          </Row>
          
          <div style={{ marginTop: 24 }}>
            <h3>票种销售分布</h3>
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              <Col span={6}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', color: '#1890ff' }}>58%</div>
                  <div>成人票</div>
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', color: '#52c41a' }}>22%</div>
                  <div>儿童票</div>
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', color: '#fa8c16' }}>12%</div>
                  <div>VIP票</div>
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', color: '#722ed1' }}>8%</div>
                  <div>团体票</div>
                </Card>
              </Col>
            </Row>
          </div>
        </Card>
      )}

      {activeTab === 'refund' && (
        <Card title="退票处理">
          <Table 
            columns={[
              ...columns.slice(0, 7),
              {
                title: '退票原因',
                dataIndex: 'refundReason',
                key: 'refundReason',
                render: () => '行程变更',
              },
              {
                title: '申请时间',
                dataIndex: 'applyTime',
                key: 'applyTime',
                render: () => '2026-03-10 11:20',
              },
              {
                title: '操作',
                key: 'action',
                render: () => (
                  <Space size="small">
                    <Button type="primary" size="small">通过</Button>
                    <Button danger size="small">拒绝</Button>
                  </Space>
                ),
              },
            ]}
            dataSource={[ticketData[2]]}
          />
        </Card>
      )}
    </div>
  );
};

// 临时Statistic组件（因为上面用了但没导入）
const Statistic = ({ title, value, prefix, suffix, valueStyle }: any) => (
  <div>
    <div style={{ color: '#666', fontSize: '14px', marginBottom: 4 }}>{title}</div>
    <div style={{ fontSize: '24px', fontWeight: 'bold', ...valueStyle }}>
      {prefix}{value}{suffix}
    </div>
  </div>
);

export default TicketManagement;