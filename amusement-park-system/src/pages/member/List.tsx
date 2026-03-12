import React, { useState } from 'react';
import { Card, Table, Input, Select, Button, Tag, Space, Avatar, Typography } from 'antd';
import { SearchOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const MemberListPage: React.FC = () => {
  const [loading] = useState(false);

  const columns = [
    {
      title: '会员ID',
      dataIndex: 'memberId',
      key: 'memberId',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string, record: any) => (
        <Avatar style={{ backgroundColor: record.color }}>{record.name[0]}</Avatar>
      ),
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
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
        const colorMap: Record<string, string> = {
          'normal': 'default',
          'silver': 'silver',
          'gold': 'gold',
          'diamond': 'purple'
        };
        const textMap: Record<string, string> = {
          'normal': '普通会员',
          'silver': '银卡会员',
          'gold': '金卡会员',
          'diamond': '钻石会员'
        };
        return <Tag color={colorMap[level]}>{textMap[level]}</Tag>;
      }
    },
    {
      title: '积分',
      dataIndex: 'points',
      key: 'points',
    },
    {
      title: '余额',
      dataIndex: 'balance',
      key: 'balance',
      render: (balance: number) => `¥${balance}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '正常' : '冻结'}
        </Tag>
      ),
    },
    {
      title: '注册时间',
      dataIndex: 'registerTime',
      key: 'registerTime',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link" icon={<EyeOutlined />}>查看</Button>
          <Button type="link" icon={<EditOutlined />}>编辑</Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      memberId: 'M202403100001',
      name: '张三',
      phone: '138****1234',
      level: 'gold',
      points: 2580,
      balance: 320,
      status: 'active',
      registerTime: '2024-01-15',
      color: '#1890ff',
    },
    {
      key: '2',
      memberId: 'M202403100002',
      name: '李四',
      phone: '139****5678',
      level: 'silver',
      points: 1250,
      balance: 0,
      status: 'active',
      registerTime: '2024-02-20',
      color: '#52c41a',
    },
    {
      key: '3',
      memberId: 'M202403100003',
      name: '王五',
      phone: '137****9012',
      level: 'diamond',
      points: 5680,
      balance: 850,
      status: 'active',
      registerTime: '2023-12-01',
      color: '#722ed1',
    },
  ];

  return (
    <div>
      <Title level={4}>会员档案</Title>
      
      <Card style={{ marginBottom: 24 }}>
        <Space size="middle" wrap>
          <Input 
            placeholder="会员ID/姓名/手机号" 
            prefix={<SearchOutlined />}
            style={{ width: 250 }}
          />
          <Select placeholder="会员等级" style={{ width: 120 }}>
            <Option value="normal">普通会员</Option>
            <Option value="silver">银卡会员</Option>
            <Option value="gold">金卡会员</Option>
            <Option value="diamond">钻石会员</Option>
          </Select>
          <Select placeholder="状态" style={{ width: 120 }}>
            <Option value="active">正常</Option>
            <Option value="frozen">冻结</Option>
          </Select>
          <Button type="primary" icon={<SearchOutlined />}>查询</Button>
          <Button>重置</Button>
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

export default MemberListPage;