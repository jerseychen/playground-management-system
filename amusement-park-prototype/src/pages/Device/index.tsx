import React, { useState } from 'react';
import { Card, Row, Col, Button, Table, Tag, Space, Progress, Tabs, Timeline, Alert } from 'antd';
import { 
  MonitorOutlined, 
  ToolOutlined, 
  BellOutlined,
  FileTextOutlined,
  BarChartOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  WarningOutlined,
  CheckCircleOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;

// 设备管理首页 - 基于宝点系统观察设计（强调数据可视化）
const DeviceManagement: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('monitor');

  // 设备监控数据 - 基于宝点系统的大屏监控概念
  const deviceData = [
    {
      key: '1',
      name: '旋转木马',
      id: 'DEV001',
      type: '游乐设备',
      status: 'running',
      uptime: '98.5%',
      temperature: '42°C',
      lastCheck: '2026-03-10 09:30',
      operator: '张三',
    },
    {
      key: '2',
      name: '过山车',
      id: 'DEV002',
      type: '大型设备',
      status: 'maintenance',
      uptime: '95.2%',
      temperature: '38°C',
      lastCheck: '2026-03-10 08:15',
      operator: '李四',
    },
    {
      key: '3',
      name: '摩天轮',
      id: 'DEV003',
      type: '观景设备',
      status: 'running',
      uptime: '99.1%',
      temperature: '35°C',
      lastCheck: '2026-03-10 10:45',
      operator: '王五',
    },
    {
      key: '4',
      name: '碰碰车',
      id: 'DEV004',
      type: '游乐设备',
      status: 'warning',
      uptime: '92.8%',
      temperature: '48°C',
      lastCheck: '2026-03-10 11:20',
      operator: '赵六',
    },
    {
      key: '5',
      name: '旋转咖啡杯',
      id: 'DEV005',
      type: '游乐设备',
      status: 'stopped',
      uptime: '96.3%',
      temperature: '32°C',
      lastCheck: '2026-03-10 07:50',
      operator: '钱七',
    },
  ];

  const columns = [
    {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: record.status === 'running' ? '#52c41a15' : 
                       record.status === 'warning' ? '#fa8c1615' : 
                       record.status === 'maintenance' ? '#1890ff15' : '#ff4d4f15',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: record.status === 'running' ? '#52c41a' : 
                   record.status === 'warning' ? '#fa8c16' : 
                   record.status === 'maintenance' ? '#1890ff' : '#ff4d4f',
          }}>
            {record.type === '游乐设备' ? '🎠' :
             record.type === '大型设备' ? '🎢' :
             record.type === '观景设备' ? '🎡' : '🤖'}
          </div>
          <div>
            <div style={{ fontWeight: '500' }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#999' }}>{record.id}</div>
          </div>
        </Space>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = '';
        let text = '';
        let icon = null;
        
        switch (status) {
          case 'running':
            color = 'success';
            text = '运行中';
            icon = <PlayCircleOutlined />;
            break;
          case 'maintenance':
            color = 'processing';
            text = '维护中';
            icon = <ToolOutlined />;
            break;
          case 'warning':
            color = 'warning';
            text = '预警';
            icon = <WarningOutlined />;
            break;
          case 'stopped':
            color = 'error';
            text = '已停止';
            icon = <PauseCircleOutlined />;
            break;
        }
        
        return (
          <Tag color={color} icon={icon}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: '运行率',
      dataIndex: 'uptime',
      key: 'uptime',
      render: (uptime: string) => (
        <div style={{ width: '100%' }}>
          <div style={{ marginBottom: 4 }}>{uptime}</div>
          <Progress 
            percent={parseFloat(uptime)} 
            size="small" 
            status={parseFloat(uptime) > 95 ? 'success' : parseFloat(uptime) > 90 ? 'normal' : 'exception'}
          />
        </div>
      ),
    },
    {
      title: '温度',
      dataIndex: 'temperature',
      key: 'temperature',
      render: (temp: string) => {
        const tempNum = parseInt(temp);
        let color = '#52c41a';
        if (tempNum > 45) color = '#ff4d4f';
        else if (tempNum > 40) color = '#fa8c16';
        return <div style={{ color, fontWeight: '500' }}>{temp}</div>;
      },
    },
    {
      title: '最后检查',
      dataIndex: 'lastCheck',
      key: 'lastCheck',
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
          <Button type="link" size="small">详情</Button>
          <Button type="link" size="small">维保</Button>
          {record.status === 'running' && (
            <Button type="link" size="small" danger>停止</Button>
          )}
        </Space>
      ),
    },
  ];

  // 报警数据
  const alarmData = [
    {
      key: '1',
      device: '碰碰车',
      level: 'high',
      message: '电机温度过高',
      time: '2026-03-10 11:20:15',
      status: '待处理',
    },
    {
      key: '2',
      device: '过山车',
      level: 'medium',
      message: '安全带传感器异常',
      time: '2026-03-10 10:45:30',
      status: '处理中',
    },
    {
      key: '3',
      device: '旋转木马',
      level: 'low',
      message: '润滑油不足',
      time: '2026-03-10 09:15:45',
      status: '已处理',
    },
  ];

  const alarmColumns = [
    {
      title: '设备',
      dataIndex: 'device',
      key: 'device',
    },
    {
      title: '级别',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => {
        const levels: any = {
          high: { color: 'error', text: '高危' },
          medium: { color: 'warning', text: '中危' },
          low: { color: 'processing', text: '低危' },
        };
        const info = levels[level] || levels.low;
        return <Tag color={info.color}>{info.text}</Tag>;
      },
    },
    {
      title: '报警信息',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === '已处理' ? 'success' : status === '处理中' ? 'processing' : 'warning'}>
          {status}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="small">
          {record.status === '待处理' && (
            <Button type="primary" size="small">处理</Button>
          )}
          <Button type="link" size="small">详情</Button>
        </Space>
      ),
    },
  ];

  // 维保记录
  const maintenanceData = [
    {
      key: '1',
      device: '旋转木马',
      type: '日常检查',
      date: '2026-03-10',
      duration: '1.5小时',
      cost: '¥850',
      result: '正常',
    },
    {
      key: '2',
      device: '过山车',
      type: '定期保养',
      date: '2026-03-09',
      duration: '3小时',
      cost: '¥2,400',
      result: '更换零件',
    },
    {
      key: '3',
      device: '摩天轮',
      type: '故障维修',
      date: '2026-03-08',
      duration: '2小时',
      cost: '¥1,500',
      result: '已修复',
    },
  ];

  // 运行统计
  const stats = {
    totalDevices: 45,
    runningDevices: 42,
    warningDevices: 1,
    maintenanceDevices: 2,
    avgUptime: 96.4,
    avgTemp: 39.2,
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: 8 }}>设备管理</h1>
        <p style={{ color: '#666' }}>监控设备运行状态、处理报警、管理维护记录</p>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ marginBottom: 24 }}>
        <TabPane tab="设备监控" key="monitor" icon={<MonitorOutlined />} />
        <TabPane tab="维护记录" key="maintenance" icon={<ToolOutlined />} />
        <TabPane tab="报警管理" key="alarm" icon={<BellOutlined />} />
        <TabPane tab="设备档案" key="archive" icon={<FileTextOutlined />} />
        <TabPane tab="运行统计" key="statistics" icon={<BarChartOutlined />} />
      </Tabs>

      {activeTab === 'monitor' && (
        <>
          {/* 统计数据卡片 */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} md={6}>
              <Card size="small">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                    {stats.totalDevices}
                  </div>
                  <div style={{ color: '#666' }}>设备总数</div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card size="small">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                    {stats.runningDevices}
                  </div>
                  <div style={{ color: '#666' }}>运行中</div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card size="small">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fa8c16' }}>
                    {stats.warningDevices}
                  </div>
                  <div style={{ color: '#666' }}>预警设备</div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card size="small">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#722ed1' }}>
                    {stats.maintenanceDevices}
                  </div>
                  <div style={{ color: '#666' }}>维护中</div>
                </div>
              </Card>
            </Col>
          </Row>

          {/* 设备监控表格 */}
          <Card title="设备监控面板">
            <Table 
              columns={columns} 
              dataSource={deviceData}
              pagination={{ pageSize: 10 }}
            />
          </Card>

          {/* 实时状态 */}
          <Card title="实时状态概览" style={{ marginTop: 16 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div>
                  <h4 style={{ marginBottom: 16 }}>设备运行率</h4>
                  <Progress 
                    percent={stats.avgUptime} 
                    size="large" 
                    status={stats.avgUptime > 95 ? 'success' : 'normal'}
                  />
                  <div style={{ marginTop: 8, color: '#666', fontSize: '12px' }}>
                    平均运行率：{stats.avgUptime}%
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <h4 style={{ marginBottom: 16 }}>平均温度</h4>
                  <Progress 
                    percent={Math.min(100, (stats.avgTemp / 60) * 100)} 
                    size="large" 
                    status={stats.avgTemp > 45 ? 'exception' : stats.avgTemp > 40 ? 'normal' : 'success'}
                    format={() => `${stats.avgTemp}°C`}
                  />
                  <div style={{ marginTop: 8, color: '#666', fontSize: '12px' }}>
                    安全范围：30°C - 45°C
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </>
      )}

      {activeTab === 'alarm' && (
        <Card title="报警管理">
          {alarmData.filter(a => a.status !== '已处理').length > 0 && (
            <Alert
              message={`有${alarmData.filter(a => a.status !== '已处理').length}个未处理报警`}
              type="warning"
              showIcon
              style={{ marginBottom: 16 }}
              action={
                <Button size="small" type="primary">
                  立即处理
                </Button>
              }
            />
          )}
          
          <Table 
            columns={alarmColumns} 
            dataSource={alarmData}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      )}

      {activeTab === 'maintenance' && (
        <Card title="维护记录">
          <Timeline
            items={maintenanceData.map(item => ({
              color: item.result === '正常' ? 'green' : 'blue',
              children: (
                <div>
                  <div style={{ fontWeight: '500' }}>{item.device} - {item.type}</div>
                  <div style={{ color: '#666', fontSize: '14px' }}>
                    {item.date} · 耗时：{item.duration} · 费用：{item.cost}
                  </div>
                  <div>
                    <Tag color={item.result === '正常' ? 'success' : 'processing'}>{item.result}</Tag>
                  </div>
                </div>
              ),
            }))}
          />
          
          <div style={{ marginTop: 24 }}>
            <h3 style={{ marginBottom: 16 }}>维护计划</h3>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card size="small">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: '500' }}>过山车月度保养</div>
                      <div style={{ fontSize: '12px', color: '#999' }}>计划时间：2026-03-15</div>
                    </div>
                    <Tag color="processing">待安排</Tag>
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: '500' }}>旋转木马季度检查</div>
                      <div style={{ fontSize: '12px', color: '#999' }}>计划时间：2026-03-20</div>
                    </div>
                    <Tag color="processing">待安排</Tag>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </Card>
      )}

      {activeTab === 'statistics' && (
        <Card title="运行统计">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card size="small">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1890ff' }}>
                    {stats.avgUptime}%
                  </div>
                  <div style={{ color: '#666' }}>平均运行率</div>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card size="small">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#52c41a' }}>
                    ¥24,850
                  </div>
                  <div style={{ color: '#666' }}>本月维护费用</div>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card size="small">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fa8c16' }}>
                    3.2次
                  </div>
                  <div style={{ color: '#666' }}>月均故障次数</div>
                </div>
              </Card>
            </Col>
          </Row>

          <div style={{ marginTop: 24 }}>
            <h3 style={{ marginBottom: 16 }}>设备运行时间分布</h3>
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <Progress type="circle" percent={98.5} size={80} />
                  <div style={{ marginTop: 8 }}>旋转木马</div>
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <Progress type="circle" percent={95.2} size={80} status="normal" />
                  <div style={{ marginTop: 8 }}>过山车</div>
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <Progress type="circle" percent={99.1} size={80} />
                  <div style={{ marginTop: 8 }}>摩天轮</div>
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <Progress type="circle" percent={92.8} size={80} status="exception" />
                  <div style={{ marginTop: 8 }}>碰碰车</div>
                </Card>
              </Col>
            </Row>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DeviceManagement;