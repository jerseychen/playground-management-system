import React from 'react';
import { Card, Form, Input, Button, Checkbox, Typography, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, QrcodeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    message.success('登录成功！');
    navigate('/dashboard');
  };

  const handleQrLogin = () => {
    message.info('扫码登录功能开发中');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Card style={{ width: 420, borderRadius: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={2} style={{ marginBottom: 8, color: '#1890ff' }}>游乐园管理系统</Title>
          <Text type="secondary">高效管理您的游乐园业务</Text>
        </div>

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="用户名" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <a style={{ float: 'right' }} href="#">
              忘记密码?
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              登录
            </Button>
          </Form.Item>
        </Form>

        <Divider>或</Divider>

        <div style={{ textAlign: 'center' }}>
          <Button 
            icon={<QrcodeOutlined />} 
            onClick={handleQrLogin}
            style={{ marginBottom: 16 }}
            block
          >
            扫码登录
          </Button>
          
          <div style={{ marginTop: 16 }}>
            <Text type="secondary">体验账号: </Text>
            <Text copyable>admin / 123456</Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;