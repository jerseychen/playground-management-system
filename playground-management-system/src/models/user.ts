import { currentUser as queryCurrentUser } from '@/services/ant-design-pro/api';
import { useState, useCallback } from 'react';

export default () => {
  const [user, setUser] = useState<API.CurrentUser>({
    name: '管理员',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'admin@playground.com',
    signature: '游乐场管理系统管理员',
    title: '系统管理员',
    group: '总部',
    tags: [],
    notifyCount: 12,
    unreadCount: 5,
    country: 'China',
    access: 'admin',
    geographic: {
      province: { label: '广东省', key: '440000' },
      city: { label: '深圳市', key: '440300' },
    },
    address: '深圳市南山区科技园',
    phone: '0755-88888888',
  });

  const fetchUser = useCallback(async () => {
    try {
      const msg = await queryCurrentUser({ skipErrorHandler: true });
      if (msg.data) {
        setUser(msg.data);
      }
    } catch (error) {
      // 使用默认用户
    }
  }, []);

  return {
    user,
    fetchUser,
  };
};
