import React, { useState } from 'react';
import { Card, Row, Col, Button, Form, Input, Select, Table, Tag, Space, Avatar, Tabs, Progress } from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  StarOutlined,
  GiftOutlined,
  HistoryOutlined,
  BarChartOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { TabPane } = Tabs;

// 会员管理首页 - 基于油菜花系统观察设计
const MemberManagement: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('archive');

  // 会员数据模拟
  const memberData = [
    {
      key: '1',
      id: 'M100001',
      name: '张三',
      avatar: '张',
      phone: '138****5678',
      level: 'VIP会员',
      points: 2560,
      totalSpent: '¥12,580',
      lastVisit: '2026-03-10',
      status: '正常',
    },
    {
      key: '2',
      id: 'M100002',
      name: '李四',
      avatar: '李',
      phone: '139****1234',
      level: '普通会员',
      points: 850,
      totalSpent: '¥3,420',
      lastVisit: '2026-03-09',
      status: '正常',
    },
    {
      key: '3',
      id: 'M100003',
      name: '王五',
      avatar: '王',
      phone: '136****9876',
      level: 'SVIP会员',
      points: 5890,
      totalSpent: '¥28,950',
      lastVisit: '2026-03-10',
      status: '正常',
    },
    {
      key: '4',
      id: 'M100004',
      name: '赵六',
      avatar: '赵',
      phone: '135****4321',
      level: '普通会员',
      points: 420,
      totalSpent: '¥1,680',
      lastVisit: '2026-03-08',
      status: '冻结',
    },
    {
      key: '5',
      id: 'M100005',
      name: '钱七',
      avatar: '钱',
      phone: '137****6543',
      level: 'VIP会员',
      points: 3120,
      totalSpent: '¥15,240',
      lastVisit: '2026-03-10',
      status: '正常',
    },
  ];

  const columns = [
    {
      title: '会员信息',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
            {record.avatar}
          </Avatar>
          <div>
            <div style={{ fontWeight: '500' }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#999' }}>{record.id}</div>
          </div>
        </Space>
      ),
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '会员等级',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => {
        let color = '';
        if (level === '普通会员') color = 'default';
        if (level === 'VIP会员') color = 'blue';
        if (level === 'SVIP会员') color = 'purple';
        return <Tag color={color}>{level}</Tag>;
      },
    },
    {
      title: '积分',
      dataIndex: 'points',
      key: 'points',
      render: (points: number) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <StarOutlined style={{ color: '#faad14' }} />
          <span>{points.toLocaleString()}</span>
        </div>
      ),
    },
    {
      title: '累计消费',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
    },
    {
      title: '最后到店',
      dataIndex: 'lastVisit',
      key: 'lastVisit',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === '正常' ? 'success' : 'error'}>{status}</Tag>
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
          <Button type="link" size="small" icon={<HistoryOutlined />}>
            记录
          </Button>
          {record.status === '正常' ? (
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              冻结
            </Button>
          ) : (
            <Button type="link" size="small" icon={<PlusOutlined />}>
              解冻
            </Button>
          )}
        </Space>
      ),
    },
  ];

  // 营销活动数据
  const marketingData = [
    {
      key: '1',
      name: '生日特权活动',
      type: '生日福利',
      target: '所有会员',
      period: '2026.03.01-2026.03.31',
      participants: 156,
      status: '进行中',
    },
    {
      key: '2',
      name: '积分翻倍活动',
      type: '积分促销',
      target: 'VIP以上会员',
      period: '2026.03.05-2026.03.12',
      participants: 89,
      status: '进行中',
    },
    {
      key: '3',
      name: '新会员专享礼',
      type: '拉新活动',
      target: '新注册会员',
      period: '2026.02.01-2026.02.28',
      participants: 203,
      status: '已结束',
    },
    {
      key: '4',
      name: '充值送积分',
      type: '充值活动',
      target: '所有会员',
      period: '2026.03.08-2026.03.15',
      participants: 312,
      status: '进行中',
    },
  ];

  const marketingColumns = [
    {
      title: '活动名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '活动类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: '目标群体',
      dataIndex: 'target',
      key: 'target',
    },
    {
      title: '活动周期',
      dataIndex: 'period',
      key: 'period',
    },
    {
      title: '参与人数',
      dataIndex: 'participants',
      key: 'participants',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === '进行中' ? 'success' : 'default'}>{status}</Tag>
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
            数据
          </Button>
          {record.status === '进行中' && (
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              结束
            </Button>
          )}
        </Space>
      ),
    },
  ];

  // 会员分析数据
  const analysisData = {
    totalMembers: 3856,
    newToday: 156,
    vipMembers: 856,
    svipMembers: 298,
    activeRate: 68.5,
    avgSpent: 124.8,
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: 8 }}>会员管理</h1>
        <p style={{ color: '#666' }}>管理会员档案、积分、营销活动及会员分析</p>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ marginBottom: 24 }}>
        <TabPane tab="会员档案" key="archive" icon={<UserOutlined />} />
        <TabPane tab="积分管理" key="points" icon={<StarOutlined />} />
        <TabPane tab="会员营销" key="marketing" icon={<GiftOutlined />} />
        <TabPane tab="消费记录" key="records" icon={<HistoryOutlined />} />
        <TabPane tab="会员分析" key="analysis" icon={<BarChartOutlined />} />
      </Tabs>

      {activeTab === 'archive' && (
        <>
          <Card 
            title="会员列表" 
            extra={
              <Space>
                <Button icon={<PlusOutlined />} onClick={() => navigate('/member/archive/create')}>
                  新增会员
                </Button>
                <Button icon={<ReloadOutlined />}>导出</Button>
              </Space>
            }
            style={{ marginBottom: 16 }}
          >
            <Form layout="inline" style={{ marginBottom: 16 }}>
              <Form.Item label="会员信息">
                <Input placeholder="姓名/手机号/会员号" />
              </Form.Item>
              <Form.Item label="会员等级">
                <Select placeholder="全部等级" style={{ width: 120 }}>
                  <Option value="all">全部</Option>
                  <Option value="normal">普通会员</Option>
                  <Option value="vip">VIP会员</Option>
                  <Option value="svip">SVIP会员</Option>
                </Select>
              </Form.Item>
              <Form.Item label="状态">
                <Select placeholder="全部状态" style={{ width: 120 }}>
                  <Option value="all">全部</Option>
                  <Option value="active">正常</Option>
                  <Option value="frozen">冻结</Option>
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
              dataSource={memberData}
              pagination={{ pageSize: 10 }}
            />
          </Card>

          <Row gutter={16}>
            <Col span={8}>
              <Card size="small">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1890ff' }}>
                    {analysisData.totalMembers.toLocaleString()}
                  </div>
                  <div style={{ color: '#666' }}>会员总数</div>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card size="small">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#52c41a' }}>
                    {analysisData.newToday}
                  </div>
                  <div style={{ color: '#666' }}>今日新增</div>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card size="small">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#fa8c16' }}>
                    {analysisData.vipMembers + analysisData.svipMembers}
                  </div>
                  <div style={{ color: '#666' }}>VIP以上会员</div>
                </div>
              </Card>
            </Col>
          </Row>
        </>
      )}

      {activeTab === 'points' && (
        <Card title="积分管理">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', color: '#faad14', marginBottom: 8 }}>
                    <StarOutlined />
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold' }}>2,890,450</div>
                  <div style={{ color: '#666' }}>总积分余额</div>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', color: '#52c41a', marginBottom: 8 }}>
                    📈
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold' }}>156,820</div>
                  <div style={{ color: '#666' }}>今日新增积分</div>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', color: '#1890ff', marginBottom: 8 }}>
                    🎁
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold' }}>1,245</div>
                  <div style={{ color: '#666' }}>今日积分兑换</div>
                </div>
              </Card>
            </Col>
          </Row>

          <div style={{ marginTop: 24 }}>
            <h3 style={{ marginBottom: 16 }}>积分规则</h3>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card size="small" title="消费积分">
                  <p>每消费¥1获得1积分</p>
                  <p>VIP会员消费积分1.5倍</p>
                  <p>SVIP会员消费积分2倍</p>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" title="积分兑换">
                  <p>100积分 = ¥1</p>
                  <p>可兑换商品、优惠券</p>
                  <p>积分有效期为1年</p>
                </Card>
              </Col>
            </Row>
          </div>
        </Card>
      )}

      {activeTab === 'marketing' && (
        <Card 
          title="会员营销" 
          extra={
            <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/member/marketing/create')}>
              创建活动
            </Button>
          }
        >
          <Table 
            columns={marketingColumns} 
            dataSource={marketingData}
            pagination={{ pageSize: 10 }}
          />
          
          <div style={{ marginTop: 24 }}>
            <h3 style={{ marginBottom: 16 }}>营销活动模板</h3>
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Card 
                  hoverable
                  style={{ textAlign: 'center' }}
                  onClick={() => navigate('/member/marketing/create?template=birthday')}
                >
                  <div style={{ fontSize: '32px', marginBottom: 8 }}>🎂</div>
                  <h4 style={{ margin: 0 }}>生日特权</h4>
                  <p style={{ color: '#666', fontSize: '12px' }}>会员生日专属福利</p>
                </Card>
              </Col>
              <Col span={6}>
                <Card 
                  hoverable
                  style={{ textAlign: 'center' }}
                  onClick={() => navigate('/member/marketing/create?template=points')}
                >
                  <div style={{ fontSize: '32px', marginBottom: 8 }}>⭐</div>
                  <h4 style={{ margin: 0 }}>积分翻倍</h4>
                  <p style={{ color: '#666', fontSize: '12px' }}>特定时段积分奖励</p>
                </Card>
              </Col>
              <Col span={6}>
                <Card 
                  hoverable
                  style={{ textAlign: 'center' }}
                  onClick={() => navigate('/member/marketing/create?template=new')}
                >
                  <div style={{ fontSize: '32px', marginBottom: 8 }}>🆕</div>
                  <h4 style={{ margin: 0 }}>新会员礼</h4>
                  <p style={{ color: '#666', fontSize: '12px' }}>注册即享专属优惠</p>
                </Card>
              </Col>
              <Col span={6}>
                <Card 
                  hoverable
                  style={{ textAlign: 'center' }}
                  onClick={() => navigate('/member/marketing/create?template=recharge')}
                >
                  <div style={{ fontSize: '32px', marginBottom: 8 }}>💰</div>
                  <h4 style={{ margin: 0 }}>充值有礼</h4>
                  <p style={{ color: '#666', fontSize: '12px' }}>充值赠送积分/优惠券</p>
                </Card>
              </Col>
            </Row>
          </div>
        </Card>
      )}

      {activeTab === 'analysis' && (
        <Card title="会员分析">
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card size="small">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{analysisData.activeRate}%</div>
                  <div style={{ color: '#666' }}>活跃度</div>
                  <Progress percent={analysisData.activeRate} size="small" />
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold' }}>¥{analysisData.avgSpent}</div>
                  <div style={{ color: '#666' }}>客单价</div>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold' }}>4.2次</div>
                  <div style={{ color: '#666' }}>年均到店频次</div>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold' }}>28天</div>
                  <div style={{ color: '#666' }}>平均复购周期</div>
                </div>
              </Card>
            </Col>
          </Row>

          <div style={{ marginTop: 24 }}>
            <h3 style={{ marginBottom: 16 }}>会员等级分布</h3>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', color: '#666', marginBottom: 8 }}>
                    {Math.round(analysisData.totalMembers - analysisData.vipMembers - analysisData.svipMembers)}
                  </div>
                  <div>普通会员</div>
                  <div style={{ color: '#999', fontSize: '12px' }}>占比 70.1%</div>
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', color: '#1890ff', marginBottom: 8 }}>
                    {analysisData.vipMembers}
                  </div>
                  <div>VIP会员</div>
                  <div style={{ color: '#999', fontSize: '12px' }}>占比 22.2%</div>
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', color: '#722ed1', marginBottom: 8 }}>
                    {analysisData.svipMembers}
                  </div>
                  <div>SVIP会员</div>
                  <div style={{ color: '#999', fontSize: '12px' }}>占比 7.7%</div>
                </Card>
              </Col>
            </Row>
          </div>

          <div style={{ marginTop: 24 }}>
            <h3 style={{ marginBottom: 16 }}>会员增长趋势</h3>
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Card size="small">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>+12.5%</div>
                    <div style={{ color: '#666', fontSize: '12px' }}>月增长率</div>
                  </div>
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>+23.8%</div>
                    <div style={{ color: '#666', fontSize: '12px' }}>季度增长率</div>
                  </div>
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>+156</div>
                    <div style={{ color: '#666', fontSize: '12px' }}>本月新增</div>
                  </div>
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>8.3%</div>
                    <div style={{ color: '#666', fontSize: '12px' }}>流失率</div>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MemberManagement;