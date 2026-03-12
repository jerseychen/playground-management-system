import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Tag,
  Space,
  Button,
  Badge,
  Typography,
  Tabs,
  DatePicker,
  Select,
  Radio,
} from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DesktopOutlined,
  GiftOutlined,
  ExportOutlined,
  PrinterOutlined,
  ReloadOutlined,
  ShopOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import type { TabsProps } from 'antd';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

// 趋势数据
const trendData = [
  { name: '周一', revenue: 12000, coin: 8500, member: 320 },
  { name: '周二', revenue: 15000, coin: 9200, member: 380 },
  { name: '周三', revenue: 18000, coin: 10500, member: 450 },
  { name: '周四', revenue: 14000, coin: 8800, member: 360 },
  { name: '周五', revenue: 22000, coin: 12800, member: 520 },
  { name: '周六', revenue: 28000, coin: 15600, member: 680 },
  { name: '周日', revenue: 25000, coin: 14200, member: 610 },
];

// 营收构成数据 - 按渠道
const revenueByChannel = [
  { name: '线下门店', value: 45, color: '#1890ff' },
  { name: '微信小程序', value: 30, color: '#52c41a' },
  { name: '美团/大众点评', value: 15, color: '#faad14' },
  { name: '抖音', value: 10, color: '#f5222d' },
];

// 营收构成数据 - 按支付方式
const revenueByPayment = [
  { name: '微信支付', value: 40, color: '#1890ff' },
  { name: '支付宝', value: 35, color: '#52c41a' },
  { name: '现金', value: 15, color: '#faad14' },
  { name: '银行卡', value: 10, color: '#f5222d' },
];

// 机台投币数据
const machineData = [
  { name: '彩票机', value: 30, color: '#722ed1' },
  { name: '礼品机', value: 25, color: '#13c2c2' },
  { name: '中性机', value: 20, color: '#eb2f96' },
  { name: '模拟机', value: 15, color: '#f5222d' },
  { name: '大项目', value: 10, color: '#fa8c16' },
];

// 门店排名数据
const storeRankingData = [
  { key: '1', rank: 1, name: '万达广场店', revenue: '¥45,280', coin: '¥32,580', growth: '+12.5%', status: 'up' },
  { key: '2', rank: 2, name: '银泰城店', revenue: '¥38,560', coin: '¥28,960', growth: '+8.3%', status: 'up' },
  { key: '3', rank: 3, name: '龙湖天街店', revenue: '¥32,180', coin: '¥25,680', growth: '-2.1%', status: 'down' },
  { key: '4', rank: 4, name: '万象城店', revenue: '¥28,950', coin: '¥22,580', growth: '+5.7%', status: 'up' },
  { key: '5', rank: 5, name: '大悦城店', revenue: '¥25,620', coin: '¥19,860', growth: '+3.2%', status: 'up' },
];

// 机台投币明细数据
const machineDetailData = [
  { key: '1', no: 1, name: '抓娃娃机-A01', code: 'M001', coins: 1250, gifts: 45, faults: 0, status: 'normal', type: '礼品机' },
  { key: '2', no: 2, name: '赛车模拟器-B02', code: 'M002', coins: 980, gifts: 0, faults: 1, status: 'warning', type: '模拟机' },
  { key: '3', no: 3, name: '投篮机-C03', code: 'M003', coins: 1560, gifts: 0, faults: 0, status: 'normal', type: '彩票机' },
  { key: '4', no: 4, name: '跳舞机-D04', code: 'M004', coins: 890, gifts: 0, faults: 0, status: 'normal', type: '模拟机' },
  { key: '5', no: 5, name: '礼品机-E05', code: 'M005', coins: 2100, gifts: 78, faults: 2, status: 'warning', type: '礼品机' },
];

// 会员排行数据 - 按充值
const memberByRecharge = [
  { key: '1', rank: 1, id: 'M10001', level: '钻石会员', amount: '¥12,580', count: 45, lastTime: '2026-03-10' },
  { key: '2', rank: 2, id: 'M10023', level: '钻石会员', amount: '¥10,230', count: 38, lastTime: '2026-03-10' },
  { key: '3', rank: 3, id: 'M10056', level: '白金会员', amount: '¥8,950', count: 32, lastTime: '2026-03-09' },
  { key: '4', rank: 4, id: 'M10089', level: '白金会员', amount: '¥7,680', count: 28, lastTime: '2026-03-09' },
  { key: '5', rank: 5, id: 'M10112', level: '黄金会员', amount: '¥6,420', count: 25, lastTime: '2026-03-08' },
];

// 会员排行数据 - 按投币
const memberByCoin = [
  { key: '1', rank: 1, id: 'M20001', level: '钻石会员', amount: '¥8,580', count: 65, lastTime: '2026-03-10' },
  { key: '2', rank: 2, id: 'M20023', level: '白金会员', amount: '¥7,230', count: 58, lastTime: '2026-03-10' },
  { key: '3', rank: 3, id: 'M20056', level: '白金会员', amount: '¥6,950', count: 52, lastTime: '2026-03-09' },
  { key: '4', rank: 4, id: 'M20089', level: '黄金会员', amount: '¥5,680', count: 48, lastTime: '2026-03-09' },
  { key: '5', rank: 5, id: 'M20112', level: '黄金会员', amount: '¥4,420', count: 45, lastTime: '2026-03-08' },
];

// 大项目数据
const projectData = [
  { name: '淘气堡', value: 8500 },
  { name: '电玩区', value: 7200 },
  { name: 'VR体验', value: 5800 },
  { name: '攀岩墙', value: 4200 },
  { name: '蹦床区', value: 3600 },
];

// 知识库数据
const knowledgeData = [
  { title: '系统更新说明 V2.5.0', date: '2026-03-10', content: '新增AI风控功能，优化会员管理模块' },
  { title: '系统更新说明 V2.4.0', date: '2026-02-28', content: '新增数据大屏功能，优化报表查询' },
];

// 运营资讯数据
const newsData = [
  { type: '系统公告', title: '系统将于今晚 02:00 进行例行维护', date: '2026-03-11', color: 'blue' },
  { type: '运营提醒', title: '本周六日预计客流量较大，请提前准备', date: '2026-03-10', color: 'orange' },
  { type: '营销活动', title: '春季特惠活动已上线，充值满500送100', date: '2026-03-09', color: 'green' },
];

const Analysis: React.FC = () => {
  const [trendTab, setTrendTab] = useState('revenue');
  const [revenueTab, setRevenueTab] = useState('channel');
  const [storeTab, setStoreTab] = useState('revenue');
  const [machineTab, setMachineTab] = useState('tag');
  const [machineDetailTab, setMachineDetailTab] = useState('all');
  const [memberTab, setMemberTab] = useState('recharge');

  // 快捷入口按钮
  const quickEntries = [
    { icon: <ShoppingCartOutlined />, label: '快速收银', color: '#1890ff' },
    { icon: <UserOutlined />, label: '快速办卡', color: '#52c41a' },
    { icon: <DesktopOutlined />, label: '设备报修', color: '#faad14' },
    { icon: <GiftOutlined />, label: '礼品兑换', color: '#f5222d' },
    { icon: <ExportOutlined />, label: '数据导出', color: '#722ed1' },
    { icon: <PrinterOutlined />, label: '打印小票', color: '#13c2c2' },
  ];

  // 表格列定义
  const storeColumns = [
    { title: '排名', dataIndex: 'rank', key: 'rank', width: 60 },
    { title: '门店名称', dataIndex: 'name', key: 'name' },
    { title: storeTab === 'revenue' ? '营业收入' : '耗币数', dataIndex: storeTab === 'revenue' ? 'revenue' : 'coin', key: 'amount' },
    {
      title: '环比增长',
      dataIndex: 'growth',
      key: 'growth',
      render: (text: string, record: any) => (
        <span style={{ color: record.status === 'up' ? '#52c41a' : '#f5222d' }}>
          {record.status === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {text}
        </span>
      ),
    },
  ];

  const machineColumns = [
    { title: '序号', dataIndex: 'no', key: 'no', width: 60 },
    { title: '设备名称', dataIndex: 'name', key: 'name' },
    { title: '设备编号', dataIndex: 'code', key: 'code' },
    { title: '投币数', dataIndex: 'coins', key: 'coins' },
    { title: '出礼品数', dataIndex: 'gifts', key: 'gifts' },
    { title: '故障次数', dataIndex: 'faults', key: 'faults' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge status={status === 'normal' ? 'success' : 'warning'} text={status === 'normal' ? '正常' : '异常'} />
      ),
    },
  ];

  const memberColumns = [
    { title: '排名', dataIndex: 'rank', key: 'rank', width: 60 },
    { title: '会员ID', dataIndex: 'id', key: 'id' },
    {
      title: '会员等级',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => {
        const color = level === '钻石会员' ? 'gold' : level === '白金会员' ? 'purple' : 'blue';
        return <Tag color={color}>{level}</Tag>;
      },
    },
    { title: memberTab === 'recharge' ? '充值金额' : '投币金额', dataIndex: 'amount', key: 'amount' },
    { title: '消费次数', dataIndex: 'count', key: 'count' },
    { title: '最近消费', dataIndex: 'lastTime', key: 'lastTime' },
  ];

  // 趋势分析 Tab
  const trendTabItems: TabsProps['items'] = [
    { key: 'revenue', label: '营业额' },
    { key: 'coin', label: '耗币数' },
    { key: 'member', label: '会员' },
  ];

  // 营收构成 Tab
  const revenueTabItems: TabsProps['items'] = [
    { key: 'channel', label: '按渠道' },
    { key: 'tag', label: '按经营标签' },
    { key: 'package', label: '按套餐' },
    { key: 'customer', label: '按顾客' },
    { key: 'payment', label: '按支付方式' },
  ];

  // 门店排名 Tab
  const storeTabItems: TabsProps['items'] = [
    { key: 'revenue', label: '营业额' },
    { key: 'coin', label: '耗币数' },
  ];

  // 机台投币概况 Tab
  const machineTabItems: TabsProps['items'] = [
    { key: 'tag', label: '按经营标签' },
    { key: 'type', label: '按机台分类' },
  ];

  // 机台投币明细 Tab
  const machineDetailTabItems: TabsProps['items'] = [
    { key: 'all', label: '全部' },
    { key: 'lottery', label: '彩票机' },
    { key: 'gift', label: '礼品机' },
    { key: 'neutral', label: '中性机' },
    { key: 'sim', label: '模拟机' },
    { key: 'project', label: '大项目' },
  ];

  // 会员排行 Tab
  const memberTabItems: TabsProps['items'] = [
    { key: 'recharge', label: '充值' },
    { key: 'coin', label: '投币' },
    { key: 'ticket', label: '存奖票' },
    { key: 'exchange', label: '兑换礼品' },
    { key: 'recycle', label: '回收礼品' },
  ];

  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      {/* 顶部筛选栏 */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col>
            <Space>
              <span>营业日期：</span>
              <Radio.Group defaultValue="today">
                <Radio.Button value="today">今日</Radio.Button>
                <Radio.Button value="yesterday">昨日</Radio.Button>
                <Radio.Button value="week">本周</Radio.Button>
                <Radio.Button value="lastweek">上周</Radio.Button>
                <Radio.Button value="month">本月</Radio.Button>
                <Radio.Button value="lastmonth">上月</Radio.Button>
                <Radio.Button value="year">本年</Radio.Button>
              </Radio.Group>
            </Space>
          </Col>
          <Col>
            <RangePicker />
          </Col>
          <Col>
            <Text type="secondary">数据更新时间：2026-03-12 00:35:00</Text>
          </Col>
          <Col flex="auto" style={{ textAlign: 'right' }}>
            <Space>
              <Select defaultValue="all" style={{ width: 150 }} suffixIcon={<ShopOutlined />}>
                <Option value="all">全部门店</Option>
                <Option value="store1">万达广场店</Option>
                <Option value="store2">银泰城店</Option>
                <Option value="store3">龙湖天街店</Option>
              </Select>
              <Button icon={<ReloadOutlined />}>刷新</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 快捷入口 */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          {quickEntries.map((item, index) => (
            <Col key={index} xs={12} sm={8} md={4}>
              <Button
                type="dashed"
                style={{
                  width: '100%',
                  height: 80,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: item.color,
                  color: item.color,
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                <div>{item.label}</div>
              </Button>
            </Col>
          ))}
        </Row>
      </Card>

      {/* 核心指标卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic
              title="今日营业额"
              value={12580}
              precision={2}
              prefix="¥"
              valueStyle={{ color: '#1890ff' }}
              suffix={<span style={{ fontSize: 12, color: '#52c41a' }}><ArrowUpOutlined /> 12.5%</span>}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic
              title="今日客流量"
              value={358}
              suffix="人"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic
              title="会员客单价"
              value={68.5}
              precision={1}
              prefix="¥"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic
              title="散客客单价"
              value={45.2}
              precision={1}
              prefix="¥"
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic
              title="售币单价"
              value={0.85}
              precision={2}
              prefix="¥"
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic
              title="售币数"
              value={15680}
              suffix="币"
              valueStyle={{ color: '#13c2c2' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic
              title="存奖票数"
              value={3250}
              suffix="张"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic
              title="回收礼品数"
              value={128}
              suffix="件"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic
              title="新增会员"
              value={28}
              suffix="人"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic
              title="到店会员"
              value={156}
              suffix="人"
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic
              title="复购会员"
              value={89}
              suffix="人"
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic
              title="大项目人数"
              value={268}
              suffix="人"
              valueStyle={{ color: '#13c2c2' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic
              title="团购核销金额"
              value={5680}
              precision={2}
              prefix="¥"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic
              title="耗币数"
              value={12850}
              suffix="币"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic
              title="兑奖票数"
              value={2150}
              suffix="张"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic
              title="兑换礼品数"
              value={326}
              suffix="件"
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic
              title="设备在线率"
              value={92}
              suffix="%"
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic
              title="会员卡余额"
              value={156800}
              precision={2}
              prefix="¥"
              valueStyle={{ color: '#13c2c2' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 趋势分析 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card>
            <Tabs activeKey={trendTab} onChange={setTrendTab} items={trendTabItems} />
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey={trendTab} name={trendTab === 'revenue' ? '营业额' : trendTab === 'coin' ? '耗币数' : '会员数'} stroke="#1890ff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card>
            <Tabs activeKey={revenueTab} onChange={setRevenueTab} items={revenueTabItems} />
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueTab === 'payment' ? revenueByPayment : revenueByChannel}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {(revenueTab === 'payment' ? revenueByPayment : revenueByChannel).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* 门店排名和机台概况 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card>
            <Tabs activeKey={storeTab} onChange={setStoreTab} items={storeTabItems} />
            <Table
              dataSource={storeRankingData}
              columns={storeColumns}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card>
            <Tabs activeKey={machineTab} onChange={setMachineTab} items={machineTabItems} />
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={machineData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {machineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* 机台投币明细 */}
      <Card style={{ marginBottom: 24 }}>
        <Tabs activeKey={machineDetailTab} onChange={setMachineDetailTab} items={machineDetailTabItems} />
        <Table
          dataSource={machineDetailData.filter(item => machineDetailTab === 'all' || item.type === machineDetailTab)}
          columns={machineColumns}
          pagination={{ pageSize: 5 }}
          size="small"
        />
      </Card>

      {/* 会员排行和大项目 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card>
            <Tabs activeKey={memberTab} onChange={setMemberTab} items={memberTabItems} />
            <Table
              dataSource={memberTab === 'recharge' ? memberByRecharge : memberByCoin}
              columns={memberColumns}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="大项目概况">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={projectData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="value" name="营收" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* 知识库和运营资讯 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="知识库">
            <Space direction="vertical" style={{ width: '100%' }}>
              {knowledgeData.map((item, index) => (
                <div key={index} style={{ padding: '12px 0', borderBottom: index < knowledgeData.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                  <Text strong>{item.title}</Text>
                  <div style={{ marginTop: 4 }}>
                    <Text type="secondary">{item.date}</Text>
                  </div>
                  <div style={{ marginTop: 4 }}>
                    <Text>{item.content}</Text>
                  </div>
                </div>
              ))}
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="运营资讯">
            <Space direction="vertical" style={{ width: '100%' }}>
              {newsData.map((item, index) => (
                <div key={index} style={{ padding: '12px 0', borderBottom: index < newsData.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                  <Tag color={item.color}>{item.type}</Tag>
                  <Text style={{ marginLeft: 8 }}>{item.title}</Text>
                  <Text type="secondary" style={{ float: 'right' }}>{item.date}</Text>
                </div>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analysis;
