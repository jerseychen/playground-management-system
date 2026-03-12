import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, List, Tag, Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

const newsData = [
  {
    id: 1,
    title: '系统维护通知',
    content: '系统将于本周日凌晨 02:00-04:00 进行例行维护，期间部分功能可能无法使用。',
    date: '2026-03-11',
    type: '系统公告',
    tag: 'important',
  },
  {
    id: 2,
    title: '春季营销活动上线',
    content: '春季特惠活动已正式上线，会员充值满 500 送 100，欢迎推广。',
    date: '2026-03-10',
    type: '营销活动',
    tag: 'success',
  },
  {
    id: 3,
    title: '新功能上线：AI 风控系统',
    content: 'AI 风控系统已上线，可自动识别异常交易行为，提升门店安全。',
    date: '2026-03-09',
    type: '功能更新',
    tag: 'processing',
  },
];

const News: React.FC = () => {
  return (
    <PageContainer header={{ title: '运营资讯' }}>
      <Card>
        <List
          itemLayout="vertical"
          dataSource={newsData}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              extra={<Text type="secondary">{item.date}</Text>}
            >
              <List.Item.Meta
                title={
                  <Space>
                    <span>{item.title}</span>
                    <Tag color={item.tag === 'important' ? 'red' : item.tag === 'success' ? 'green' : 'blue'}>
                      {item.type}
                    </Tag>
                  </Space>
                }
                description={item.content}
              />
            </List.Item>
          )}
        />
      </Card>
    </PageContainer>
  );
};

export default News;
