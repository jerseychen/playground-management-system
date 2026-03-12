import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Button, Progress, Typography } from 'antd';
import { CheckCircleOutlined, WarningOutlined, CloseCircleOutlined, ToolOutlined } from '@ant-design/icons';

const { Title } = Typography;

const DeviceMonitorPage: React.FC = () => {
  const columns = [
    {
      title: '设备编号',
      dataIndex: 'deviceNo',
      key: 'deviceNo',
    },
    {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name',
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
        const colorMap: Record<string, string> = {
          'running': 'green',
          'warning': 'orange',
          'stopped': 'red',
          'maintenance': 'blue'
        };
        const textMap: Record<string, string> = {
          'running': '运行中',
          'warning': '警告',
          'stopped': '已停止',
          'maintenance': '维护中'
        };
        const iconMap: Record<string, React.ReactNode> = {
          'running': <CheckCircleOutlined />,
          'warning': <WarningOutlined />,
          'stopped': <CloseCircleOutlined />,
          'maintenance': <ToolOutlined />
        };
        return (
          <Tag color={colorMap[status]} icon={iconMap[status]}>
            {textMap[status]}
          </Tag>
        );
      }
    },
    {
      title: '运行时长',
      dataIndex: 'runtime',
      key: 'runtime',
    },
    {
      title: '今日客流',
      dataIndex: 'visitors',
      key: 'visitors',
    },
    {
      title: '健康度',
      dataIndex: 'health',
      key: 'health',
      render: (health: number) => (
        <Progress 
          percent={health} 
          size="small" 
          status={health < 60 ? 'exception' : health < 80 ? 'normal' : 'success'}
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Button type="link">详情</Button>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      deviceNo: 'DV001',
      name: '旋转木马',
      type: '游乐设施',
      status: 'running',
      runtime: '8小时',
      visitors: 450,
      health: 95,
    },
    {
      key: '2',
      deviceNo: 'DV002',
      name: '过山车',
      type: '游乐设施',
      status: 'running',
      runtime: '6小时',
      visitors: 320,
      health: 88,
    },
    {
      key: '3',
      deviceNo: 'DV003',
      name: '碰碰车',
      type: '游乐设施',
      status: 'warning',
      runtime: '4小时',
      visitors: 180,
      health: 65,
    },
    {
      key: '4',
      deviceNo: 'DV004',
      name: '摩天轮',
      type: '游乐设施',
      status: 'maintenance',
      runtime: '0小时',
      visitors: 0,
      health: 45,
    },
  ];

  return (
    <div>
      <Title level={4}>设备监控</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="设备总数"
              value={24}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="运行中"
              value={20}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="维护中"
              value={2}
              valueStyle={{ color: '#1890ff' }}
              prefix={<ToolOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="异常"
              value={2}
              valueStyle={{ color: '#f5222d' }}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
};

export default DeviceMonitorPage;