import React, { useState } from 'react';
import { Card, Table, Button, Tag, Space, Modal, Form, Input, DatePicker, Select, message, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SendOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;

const MemberMarketingPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: '活动名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '活动类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const typeMap: Record<string, string> = {
          'discount': '折扣优惠',
          'gift': '礼品赠送',
          'points': '积分翻倍',
          'upgrade': '等级提升'
        };
        return <Tag color="blue">{typeMap[type]}</Tag>;
      }
    },
    {
      title: '目标人群',
      dataIndex: 'target',
      key: 'target',
    },
    {
      title: '参与人数',
      dataIndex: 'participants',
      key: 'participants',
    },
    {
      title: '活动时间',
      dataIndex: 'timeRange',
      key: 'timeRange',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          'ongoing': 'green',
          'upcoming': 'orange',
          'ended': 'gray'
        };
        const textMap: Record<string, string> = {
          'ongoing': '进行中',
          'upcoming': '即将开始',
          'ended': '已结束'
        };
        return <Tag color={colorMap[status]}>{textMap[status]}</Tag>;
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" icon={<EyeOutlined />}>查看</Button>
          <Button type="link" icon={<EditOutlined />}>编辑</Button>
          <Button type="link" icon={<SendOutlined />}>推送</Button>
          <Button type="link" danger icon={<DeleteOutlined />}>删除</Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: '春季大促',
      type: 'discount',
      target: '全部会员',
      participants: 2580,
      timeRange: '2024-03-01 至 2024-03-31',
      status: 'ongoing',
    },
    {
      key: '2',
      name: '新会员专享',
      type: 'gift',
      target: '新注册会员',
      participants: 456,
      timeRange: '2024-03-15 至 2024-04-15',
      status: 'upcoming',
    },
    {
      key: '3',
      name: '积分狂欢节',
      type: 'points',
      target: '金卡及以上会员',
      participants: 1890,
      timeRange: '2024-02-01 至 2024-02-29',
      status: 'ended',
    },
  ];

  const handleAdd = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      console.log('Form values:', values);
      message.success('活动创建成功！');
      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <Title level={4}>会员营销</Title>
      
      <Card style={{ marginBottom: 24 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          创建活动
        </Button>
      </Card>

      <Card>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
      </Card>

      <Modal
        title="创建营销活动"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="活动名称"
            rules={[{ required: true, message: '请输入活动名称!' }]}
          >
            <Input placeholder="请输入活动名称" />
          </Form.Item>

          <Form.Item
            name="type"
            label="活动类型"
            rules={[{ required: true, message: '请选择活动类型!' }]}
          >
            <Select placeholder="请选择活动类型">
              <Option value="discount">折扣优惠</Option>
              <Option value="gift">礼品赠送</Option>
              <Option value="points">积分翻倍</Option>
              <Option value="upgrade">等级提升</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="target"
            label="目标人群"
            rules={[{ required: true, message: '请选择目标人群!' }]}
          >
            <Select placeholder="请选择目标人群">
              <Option value="all">全部会员</Option>
              <Option value="new">新注册会员</Option>
              <Option value="silver">银卡及以上</Option>
              <Option value="gold">金卡及以上</Option>
              <Option value="diamond">钻石会员</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="timeRange"
            label="活动时间"
            rules={[{ required: true, message: '请选择活动时间!' }]}
          >
            <RangePicker showTime style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="description"
            label="活动描述"
          >
            <TextArea rows={4} placeholder="请输入活动描述" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MemberMarketingPage;