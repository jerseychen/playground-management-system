import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Button, Space, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const QuickEntry: React.FC = () => {
  return (
    <PageContainer header={{ title: '快捷入口配置' }}>
      <Card>
        <Title level={4}>快捷入口管理</Title>
        <Paragraph>
          在此页面可以配置首页显示的快捷入口按钮，包括收银、办卡、设备报修等常用功能。
        </Paragraph>
        <Space>
          <Button type="primary">添加快捷入口</Button>
          <Button>批量配置</Button>
        </Space>
      </Card>
    </PageContainer>
  );
};

export default QuickEntry;
