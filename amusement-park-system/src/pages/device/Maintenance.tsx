import React, { useState } from 'react';
import { Card, Table, Button, Tag, Space, Modal, Form, Input, Select, DatePicker, message, Typography } from 'antd';
import { PlusOutlined, CheckOutlined, EyeOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const DeviceMaintenancePage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: '维护单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
    },
    {
      title: '维护类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const typeMap: Record<string, string> = {
          'routine': '日常保养',
          'repair': '故障维修',
          'inspection': '定期检查',
          'emergency': '紧急维修'
        };
        const colorMap: Record<string, string> = {
          'routine': 'green',
          'repair': 'orange',
          'inspection': 'blue',
          'emergency': 'red'
        };
        return <Tag color={colorMap[type]}>{typeMap[type]}</Tag>;
      }
    },
    {
      title: '维护内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '维护人员',
      dataIndex: 'maintainer',
      key: 'maintainer',
    },
    {
      title: '计划时间',
      dataIndex: 'scheduleTime',
      key: 'scheduleTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'completed' ? 'green' : status === 'in-progress' ? 'blue' : 'orange'}>
          {status === 'completed' ? '已完成' : status === 'in-progress' ? '进行中' : '待处理'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" icon={<EyeOutlined />}>查看</Button>
          {record.status !== 'completed' && (
            <Button type="link" icon={<CheckOutlined />}>完成</Button>
          )}
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      orderNo: 'MT202403100001',
      deviceName: '旋转木马',
      type: 'routine',
      content: '日常清洁和润滑',
      maintainer: '张师傅',
      scheduleTime: '2024-03-10 18:00',
      status: 'pending',
    },
    {
      key: '2',
      orderNo: 'MT202403090002',
      deviceName: '碰碰车',
      type: 'repair',
      content: '更换损坏的保险杠',
      maintainer: '李师傅',
      scheduleTime: '2024-03-09 14:00',
      status: 'in-progress',
    },
    {
      key: '3',
      orderNo: 'MT202403080003',
      deviceName: '摩天轮',
      type: 'inspection',
      content: '月度安全检查',
      maintainer: '王师傅',
      scheduleTime: '2024-03-08 09:00',
      status: 'completed',
    },
  ];

  const handleAdd = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      console.log('Form values:', values);
      message.success('维护任务创建成功！');
      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <Title level={4}>维护记录</Title>
      
      <Card style={{ marginBottom: 24 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增维护
        </Button>
      </Card>

      <Card>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
      </Card>

      <Modal
        title="新增维护任务"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="deviceName"
            label="设备名称"
            rules={[{ required: true, message: '请选择设备!' }]}
          >
            <Select placeholder="请选择设备">
              <Option value="旋转木马">旋转木马</Option>
              <Option value="过山车">过山车</Option>
              <Option value="碰碰车">碰碰车</Option>
              <Option value="摩天轮">摩天轮</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="type"
            label="维护类型"
            rules={[{ required: true, message: '请选择维护类型!' }]}
          >
            <Select placeholder="请选择维护类型">
              <Option value="routine">日常保养</Option>
              <Option value="repair">故障维修</Option>
              <Option value="inspection">定期检查</Option>
              <Option value="emergency">紧急维修</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="content"
            label="维护内容"
            rules={[{ required: true, message: '请输入维护内容!' }]}
          >
            <TextArea rows={3} placeholder="请输入维护内容" />
          </Form.Item>

          <Form.Item
            name="maintainer"
            label="维护人员"
            rules={[{ required: true, message: '请输入维护人员!' }]}
          >
            <Input placeholder="请输入维护人员" />
          </Form.Item>

          <Form.Item
            name="scheduleTime"
            label="计划时间"
            rules={[{ required: true, message: '请选择计划时间!' }]}
          >
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DeviceMaintenancePage;