import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar,
} from 'recharts';
import {
  Card, Row, Col, Statistic, Table, Tag, Space, Button, Badge, Typography, Tabs,
  DatePicker, Select, Radio, Tree, Divider,
} from 'antd';
import {
  ArrowUpOutlined, ArrowDownOutlined, ShoppingCartOutlined, UserOutlined,
  DesktopOutlined, GiftOutlined, ExportOutlined, PrinterOutlined, ReloadOutlined,
  ShopOutlined, HomeOutlined,
} from '@ant-design/icons';
import type { TabsProps } from 'antd';
import type { DataNode } from 'antd/es/tree';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

// 门店树型数据
const storeTreeData: DataNode[] = [
  { title: '全部门店', key: 'all', icon: <ShopOutlined /> },
  {
    title: '华东区', key: 'east',
    children: [
      { title: '万达广场店', key: 'store1' },
      { title: '银泰城店', key: 'store2' },
      { title: '龙湖天街店', key: 'store3' },
    ],
  },
  {
    title: '华南区', key: 'south',
    children: [
      { title: '万象城店', key: 'store4' },
      { title: '大悦城店', key: 'store5' },
    ],
  },
  {
    title: '华北区', key: 'north',
    children: [
      { title: '朝阳大悦城店', key: 'store6' },
      { title: '西单店', key: 'store7' },
    ],
  },
];

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
];

// 机台投币明细数据
const machineDetailData = [
  { key: '1', no: 1, name: '抓娃娃机-A01', code: 'M001', coins: 1250, gifts: 45, faults: 0, status: 'normal', type: '礼品机' },
  { key: '2', no: 2, name: '赛车模拟器-B02', code: 'M002', coins: 980, gifts: 0, faults: 1, status: 'warning', type: '模拟机' },
];

// 会员排行数据
const memberByRecharge = [
  { key: '1', rank: 1, id: 'M10001', level: '钻石会员', amount: '¥12,580', count: 45, lastTime: '2026-03-10' },
  { key: '2', rank: 2, id: 'M10023', level: '钻石会员', amount: '¥10,230', count: 38, lastTime: '2026-03-10' },
];

// 大项目数据
const projectData = [
  { name: '淘气堡', value: 8500 },
  { name: '电玩区', value: 7200 },
  { name: 'VR体验', value: 5800 },
];

const Analysis: React.FC = () => {
  const [selectedStores, setSelectedStores] = useState<string[]>(['all']);
  const [comparePeriod, setComparePeriod] = useState('lastYear');
  const [trendTab, setTrendTab] = useState('revenue');
  const [revenueTab, setRevenueTab] = useState('channel');

  // 快捷入口按钮
  const quickEntries = [
    { icon: <ShoppingCartOutlined />, label: '快速收银', color: '#1890ff' },
    { icon: <UserOutlined />, label: '快速办卡', color: '#52c41a' },
    { icon: <DesktopOutlined />, label: '设备报修', color: '#faad14' },
    { icon: <GiftOutlined />, label: '礼品兑换', color: '#f5222d' },
    { icon: <ExportOutlined />, label: '数据导出', color: '#722ed1' },
    { icon: <PrinterOutlined />, label: '打印小票', color: '#13c2c2' },
  ];

  // 模块标题组件
  const ModuleTitle: React.FC<{ icon: string; title: string; color: string }> = ({ icon, title, color }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
      <div style={{ width: 4, height: 20, background: color, borderRadius: 2 }} />
      <span style={{ fontSize: 18, fontWeight: 'bold', color: '#1f2937' }}>{icon} {title}</span>
    </div>
  );

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

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f2f5' }}>
      {/* 左侧门店树 */}
      <div style={{ width: 240, background: '#fff', borderRight: '1px solid #f0f0f0', padding: 16 }}>
        <Title level={5} style={{ marginBottom: 16 }}>
          <ShopOutlined style={{ marginRight: 8, color: '#1890ff' }} />
          门店选择
        </Title>
        <Tree
          checkable
          defaultExpandedKeys={['east', 'south', 'north']}
          defaultCheckedKeys={['all']}
          treeData={storeTreeData}
          onCheck={(checkedKeys) => setSelectedStores(checkedKeys as string[])}
        />
      </div>

      {/* 右侧内容区 */}
      <div style={{ flex: 1, padding: 24 }}>
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
            <Col flex="auto" style={{ textAlign: 'right' }}>
              <Space>
                <Text>对比：</Text>
                <Select value={comparePeriod} onChange={setComparePeriod} style={{ width: 120 }}>
                  <Option value="lastYear">去年同期</Option>
                  <Option value="lastMonth">上月同期</Option>
                  <Option value="lastWeek">上周同期</Option>
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
                    width: '100%', height: 80, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', borderColor: item.color, color: item.color,
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                  <div>{item.label}</div>
                </Button>
              </Col>
            ))}
          </Row>
        </Card>

        {/* 18个指标卡片 */}
        <Row gutter={[12, 12]} style={{ marginBottom: 24 }}>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card><Statistic title="营业额" value={8888} prefix="¥" valueStyle={{ color: '#1890ff' }} /></Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card><Statistic title="会员客单价" value={88} prefix="¥" valueStyle={{ color: '#52c41a' }} /></Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card><Statistic title="售币单价" value={0.255} prefix="¥" valueStyle={{ color: '#faad14' }} /></Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card><Statistic title="售币数" value={88} suffix="币" valueStyle={{ color: '#722ed1' }} /></Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card><Statistic title="存票票数" value={88} suffix="张" valueStyle={{ color: '#13c2c2' }} /></Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card><Statistic title="回收礼品数" value={88} suffix="件" valueStyle={{ color: '#eb2f96' }} /></Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card><Statistic title="新增会员" value={88} suffix="人" valueStyle={{ color: '#1890ff' }} /></Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card><Statistic title="到店会员" value={88} suffix="人" valueStyle={{ color: '#52c41a' }} /></Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card><Statistic title="复购会员" value={88} suffix="人" valueStyle={{ color: '#faad14' }} /></Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card><Statistic title="大项目人数" value={88} suffix="人" valueStyle={{ color: '#722ed1' }} /></Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card><Statistic title="团购核销金额" value={88} prefix="¥" valueStyle={{ color: '#13c2c2' }} /></Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card><Statistic title="耗币数" value={88} suffix="币" valueStyle={{ color: '#eb2f96' }} /></Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card><Statistic title="兑奖票数" value={88} suffix="张" valueStyle={{ color: '#1890ff' }} /></Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card><Statistic title="兑换礼品数" value={88} suffix="件" valueStyle={{ color: '#52c41a' }} /></Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card><Statistic title="设备在线率" value={88} suffix="%" valueStyle={{ color: '#faad14' }} /></Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card><Statistic title="会员卡余额" value={88} prefix="¥" valueStyle={{ color: '#722ed1' }} /></Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card><Statistic title="免费币" value={5450} suffix="币" valueStyle={{ color: '#13c2c2' }} /></Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card><Statistic title="散客客单价" value={88} prefix="¥" valueStyle={{ color: '#eb2f96' }} /></Card>
          </Col>
        </Row>

        {/* 门店总览 */}
        <Card title="门店总览" style={{ marginBottom: 24 }}>
          <Table
            dataSource={storeRankingData}
            columns={[
              { title: '排名', dataIndex: 'rank', key: 'rank', width: 60 },
              { title: '门店名称', dataIndex: 'name', key: 'name' },
              { title: '营业收入', dataIndex: 'revenue', key: 'revenue' },
              { title: '耗币数', dataIndex: 'coin', key: 'coin' },
              { title: '环比增长', dataIndex: 'growth', key: 'growth', render: (text: string, record: any) => (
                <span style={{ color: record.status === 'up' ? '#52c41a' : '#f5222d' }}>
                  {record.status === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {text}
                </span>
              )},
            ]}
            pagination={false}
            size="small"
          />
        </Card>

        {/* 趋势分析 */}
        <Card style={{ marginBottom: 24 }}>
          <Tabs activeKey={trendTab} onChange={setTrendTab} items={trendTabItems} />
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={trendTab} stroke="#1890ff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* 营业额构成 */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card>
              <Tabs activeKey={revenueTab} onChange={setRevenueTab} items={revenueTabItems} />
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={revenueByChannel}
                    cx="50%" cy="50%" innerRadius={60} outerRadius={100}
                    paddingAngle={5} dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {revenueByChannel.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="机台投币概况">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={machineData}
                    cx="50%" cy="50%" outerRadius={100}
                    dataKey="value" label={({ name, value }) => `${name} ${value}%`}
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
      </div>
    </div>
  );
};

export default Analysis;