import React from 'react';
import { Card, Form, Input, Button, Switch, Select, Upload, message, Typography, Tabs } from 'antd';
import { UploadOutlined, SaveOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const SettingsBasicPage: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    message.success('配置保存成功！');
  };

  return (
    <div>
      <Title level={4}>基础配置</Title>

      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="企业信息" key="1">
            <Form form={form} onFinish={onFinish} layout="vertical" style={{ maxWidth: 600 }}>
              <Form.Item
                name="companyName"
                label="企业名称"
                rules={[{ required: true, message: '请输入企业名称!' }]}
              >
                <Input placeholder="请输入企业名称" />
              </Form.Item>

              <Form.Item
                name="companyAddress"
                label="企业地址"
              >
                <Input placeholder="请输入企业地址" />
              </Form.Item>

              <Form.Item
                name="contactPhone"
                label="联系电话"
              >
                <Input placeholder="请输入联系电话" />
              </Form.Item>

              <Form.Item
                name="logo"
                label="企业Logo"
              >
                <Upload>
                  <Button icon={<UploadOutlined />}>上传Logo</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                  保存配置
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="系统设置" key="2">
            <Form layout="vertical" style={{ maxWidth: 600 }}>
              <Form.Item label="系统名称">
                <Input defaultValue="游乐园管理系统" />
              </Form.Item>

              <Form.Item label="系统语言">
                <Select defaultValue="zh-CN">
                  <Option value="zh-CN">简体中文</Option>
                  <Option value="zh-TW">繁體中文</Option>
                  <Option value="en-US">English</Option>
                </Select>
              </Form.Item>

              <Form.Item label="时区设置">
                <Select defaultValue="Asia/Shanghai">
                  <Option value="Asia/Shanghai">北京时间 (GMT+8)</Option>
                  <Option value="Asia/Hong_Kong">香港时间 (GMT+8)</Option>
                  <Option value="Asia/Taipei">台北时间 (GMT+8)</Option>
                </Select>
              </Form.Item>

              <Form.Item label="开启消息通知" valuePropName="checked">
                <Switch defaultChecked />
              </Form.Item>

              <Form.Item label="开启操作日志" valuePropName="checked">
                <Switch defaultChecked />
              </Form.Item>

              <Form.Item>
                <Button type="primary" icon={<SaveOutlined />}>
                  保存设置
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="票务设置" key="3">
            <Form layout="vertical" style={{ maxWidth: 600 }}>
              <Form.Item label="默认营业时间">
                <Input.Group compact>
                  <Input style={{ width: 100 }} defaultValue="09:00" />
                  <span style={{ padding: '0 8px', lineHeight: '32px' }}>至</span>
                  <Input style={{ width: 100 }} defaultValue="18:00" />
                </Input.Group>
              </Form.Item>

              <Form.Item label="最大售票数量">
                <Input type="number" defaultValue={5000} />
              </Form.Item>

              <Form.Item label="退票截止时间（小时）">
                <Input type="number" defaultValue={2} />
              </Form.Item>

              <Form.Item label="开启在线售票" valuePropName="checked">
                <Switch defaultChecked />
              </Form.Item>

              <Form.Item>
                <Button type="primary" icon={<SaveOutlined />}>
                  保存设置
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default SettingsBasicPage;