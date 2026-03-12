import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Card, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined, QrcodeOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    setLoading(true);
    // 模拟登录请求
    setTimeout(() => {
      setLoading(false);
      message.success('登录成功！');
      navigate('/dashboard');
    }, 1000);
  };

  // 基于油菜花和宝点系统的登录页设计
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: 420 }}
      >
        <Card
          style={{
            borderRadius: 12,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            overflow: 'hidden',
          }}
          bodyStyle={{ padding: 40 }}
        >
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                color: 'white',
                fontSize: '32px',
                fontWeight: 'bold',
              }}>
                🎡
              </div>
            </motion.div>
            <h1 style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: 'bold' }}>
              游乐场管理系统
            </h1>
            <p style={{ color: '#666', margin: 0 }}>
              欢迎回来，请登录您的账户
            </p>
          </div>

          <Form
            form={form}
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: '#999' }} />}
                placeholder="用户名/手机号"
                size="large"
                style={{ borderRadius: 6 }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#999' }} />}
                placeholder="密码"
                size="large"
                style={{ borderRadius: 6 }}
              />
            </Form.Item>

            <Form.Item>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住我</Checkbox>
                </Form.Item>
                <a style={{ fontSize: '14px' }} onClick={() => message.info('请联系管理员重置密码')}>
                  忘记密码?
                </a>
              </div>
            </Form.Item>

            <Form.Item>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  block
                  style={{
                    height: 48,
                    fontSize: '16px',
                    fontWeight: '500',
                    borderRadius: 6,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                  }}
                >
                  {loading ? '登录中...' : '登录'}
                </Button>
              </motion.div>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <div style={{ textAlign: 'center', color: '#999', fontSize: '14px' }}>
                其他登录方式
              </div>
              <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={12}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      icon={<QrcodeOutlined />}
                      size="large"
                      block
                      style={{ borderRadius: 6 }}
                    >
                      扫码登录
                    </Button>
                  </motion.div>
                </Col>
                <Col span={12}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="large"
                      block
                      style={{ borderRadius: 6 }}
                      onClick={() => message.info('演示账号：admin / 123456')}
                    >
                      体验账号
                    </Button>
                  </motion.div>
                </Col>
              </Row>
            </Form.Item>
          </Form>

          <div style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid #f0f0f0' }}>
            <div style={{ textAlign: 'center', color: '#999', fontSize: '12px' }}>
              <p style={{ margin: '4px 0' }}>© 2026 游乐场管理系统 v2.0</p>
              <p style={{ margin: '4px 0' }}>基于油菜花、宝点系统优化设计</p>
              <p style={{ margin: '4px 0' }}>
                技术支持：<a onClick={() => window.open('https://github.com', '_blank')}>GitHub</a>
              </p>
            </div>
          </div>
        </Card>

        {/* 底部信息 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: 32, color: 'rgba(255,255,255,0.8)' }}
        >
          <p style={{ margin: '8px 0', fontSize: '14px' }}>
            🎯 <strong>基于事实设计</strong>：严格参考油菜花、宝点系统功能
          </p>
          <p style={{ margin: '8px 0', fontSize: '14px' }}>
            🚀 <strong>技术栈</strong>：React + Ant Design + TypeScript
          </p>
          <p style={{ margin: '8px 0', fontSize: '14px' }}>
            💡 <strong>设计原则</strong>：信息密度优化 + 操作效率提升
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;