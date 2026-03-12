import React from 'react';
import { Card, Table, Tag, Button, Space, Typography, Row, Col, Statistic } from 'antd';
import { WarningOutlined, CheckCircleOutlined, BellOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const DeviceAlertPage: React.FC = () => {
  const columns = [
    {
      title: '报警时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
    },
    {
      title: '报警类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const colorMap: Record<string, string> = {
          'error': 'red',
          'warning': 'orange',
          'info': 'blue'
        };
        const textMap: Record<string, string> = {
          'error': '故障',
          'warning': '警告',
          'info': '提示'
        };
        return <Tag color={colorMap[type]}>{textMap[type]}</Tag>;
      }
    },
    {
      title: '报警内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '级别',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => {
        const colorMap: Record<string, string> = {
          'high': 'red',
          'medium': 'orange',
          'low': 'blue'
        };
        const textMap: Record<string, string> = {
          'high': '高',
          'medium': '中',
          'low': '低'
        };
        return <Tag color={colorMap[level]}>{textMap[level]}</Tag>;
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'resolved' ? 'green' : 'red'}>
          {status === 'resolved' ? '已处理' : '未处理'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link">查看</Button>
          {record.status !== 'resolved' && (
            <Button type="primary" size="small">处理</Button>
          )}
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      time: '2024-03-10 14:30:00',
      deviceName: '碰碰车',
      type: 'warning',
      content: '设备运行温度过高',
      level: 'medium',
      status: 'pending',
    },
    {
      key: '2',
      time: '2024-03-10 12:15:00',
      deviceName: '摩天轮',
      type: 'error',
      content: '安全锁故障，停止运行',
      level: 'high',
      status: 'resolved',
    },
    {
      key: '3',
      time: '2024-03-10 10:00:00',
      deviceName: '旋转木马',
      type: 'info',
      content: '运行时长达到维护标准',
      level: 'low',
      status: 'resolved',
    },
  ];

  return (
    <div>
      <Title level={4}>报警管理</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日报警"
              value={8}
              prefix={<BellOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="未处理"
              value={2}
              valueStyle={{ color: '#f5222d' }}
              prefix={<ExclamationCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="已处理"
              value={6}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="故障率"
              value={2.5}
              suffix="%"
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

export default DeviceAlertPage;