import React from 'react';
import { Avatar, Layout, Menu, Popover } from 'antd';
import styles from './Header.module.scss';
// @ts-ignore
import { CloudOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import LogoutButton from '@/components/LogoutButton';

export const Header: React.FC = () => {
  const router = useRouter();
  const selectedMenu = router.pathname;

  const onMenuSelect = (value: any) => router.push(value.key);

  return (
    <Layout.Header className={styles.root}>
      <div className={styles.headerInner}>
        <div className={styles.headerLeft}>
          <h2>
            <CloudOutlined />
            Cloud Store
          </h2>
          <Menu
            className={styles.topMenu}
            theme={'dark'}
            mode={'horizontal'}
            onSelect={onMenuSelect}
            defaultSelectedKeys={[selectedMenu]}
            items={[
              { key: '/dashboard', label: 'Главная' },
              { key: 'dashboard/profile', label: 'Профиль' },
            ]}
          />
        </div>
        <div className={styles.headerRight}>
          <Popover trigger="click" content={<LogoutButton />}>
            <Avatar>A</Avatar>
          </Popover>
        </div>
      </div>
    </Layout.Header>
  );
};
