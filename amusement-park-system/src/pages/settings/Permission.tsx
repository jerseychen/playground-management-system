import React, { useState } from 'react';
import { Card, Table, Button, Tag, Space, Modal, Form, Input, Select, Checkbox, message, Typography, Tree } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const SettingsPermissionPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '成员数',
      dataIndex: 'memberCount',
      key: 'memberCount',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link" icon={<EditOutlined />}>编辑</Button>
          <Button type="link" danger icon={<DeleteOutlined />}>删除</Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: '超级管理员',
      description: '系统最高权限，可管理所有功能',
      memberCount: 2,
      status: 'active',
      createTime: '2024-01-01',
    },
    {
      key: '2',
      name: '财务人员',
      description: '负责财务管理相关操作',
      memberCount: 3,
      status: 'active',
      createTime: '2024-01-15',
    },
    {
      key: '3',
      name: '售票员',
      description: '负责票务销售和查询',
      memberCount: 8,
      status: 'active',
      createTime: '2024-02-01',
    },
    {
      key: '4',
      name: '设备管理员',
      description: '负责设备监控和维护',
      memberCount: 4,
      status: 'active',
      createTime: '2024-02-10',
    },
  ];

  const permissionTreeData = [
    {
      title: '工作台',
      key: 'dashboard',
      children: [
        { title: '查看数据', key: 'dashboard.view' },
        { title: '导出报表', key: 'dashboard.export' },
      ],
    },
    {
      title: '票务管理',
      key: 'ticket',
      children: [
        { title: '快速售票', key: 'ticket.sale' },
        { title: '票务查询', key: 'ticket.query' },
        { title: '套餐设置', key: 'ticket.package' },
        { title: '票务统计', key: 'ticket.stats' },
      ],
    },
    {
      title: '会员管理',
      key: 'member',
      children: [
        { title: '会员档案', key: 'member.list' },
        { title: '积分管理', key: 'member.points' },
        { title: '会员营销', key: 'member.marketing' },
        { title: '会员分析', key: 'member.analysis' },
      ],
    },
    {
      title: '商品管理',
      key: 'product',
      children: [
        { title: '商品列表', key: 'product.list' },
        { title: '库存管理', key: 'product.inventory' },
        { title: '采购管理', key: 'product.purchase' },
      ],
    },
    {
      title: '设备管理',
      key: 'device',
      children: [
        { title: '设备监控', key: 'device.monitor' },
        { title: '维护记录', key: 'device.maintenance' },
        { title: '报警管理', key: 'device.alert' },
      ],
    },
    {
      title: '财务管理',
      key: 'finance',
      children: [
        { title: '日常收支', key: 'finance.daily' },
        { title: '对账管理', key: 'finance.reconciliation' },
        { title: '财务报表', key: 'finance.reports' },
      ],
    },
    {
      title: '系统设置',
      key: 'settings',
      children: [
        { title: '基础配置', key: 'settings.basic' },
        { title: '权限管理', key: 'settings.permission' },
      ],
    },
  ];

  const handleAdd = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      console.log('Form values:', values);
      message.success('角色创建成功！');
      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <Title level={4}>权限管理</Title>
      
      <Card style={{ marginBottom: 24 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增角色
        </Button>
      </Card>

      <Card>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
      </Card>

      <Modal
        title="新增角色"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="角色名称"
            rules={[{ required: true, message: '请输入角色名称!' }]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>

          <Form.Item
            name="description"
            label="角色描述"
          >
            <Input.TextArea rows={3} placeholder="请输入角色描述" />
          </Form.Item>

          <Form.Item
            name="permissions"
            label="权限设置"
            rules={[{ required: true, message: '请选择权限!' }]}
          >
            <Tree
              checkable
              treeData={permissionTreeData}
              defaultExpandAll
            />
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            initialValue="active"
          >
            <Select>
              <Option value="active">启用</Option>
              <Option value="inactive">禁用</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SettingsPermissionPage;