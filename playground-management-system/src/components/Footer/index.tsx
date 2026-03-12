import { useIntl } from '@umijs/max';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '游乐场管理系统',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'playground',
          title: '游乐场管理系统',
          href: '#',
          blankTarget: true,
        },
        {
          key: 'github',
          title: '技术支持',
          href: '#',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
