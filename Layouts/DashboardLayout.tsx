import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.scss';
import { Menu } from 'antd';

import {
  DeleteOutlined,
  FileImageOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { UploadButton } from '@/components/UploadButton';

export const DashboardLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();
  const selectedMenu = router.pathname;
  return (
    <main className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <UploadButton />
        <Menu
          className={styles.menu}
          mode={'inline'}
          selectedKeys={[selectedMenu]}
          onSelect={(value) => router.push(value.key)}
          items={[
            {
              key: '/dashboard',
              icon: <FileOutlined />,
              label: 'Файлы',
            },
            {
              key: '/dashboard/photos',
              icon: <FileImageOutlined />,
              label: 'Фото',
            },
            {
              key: '/dashboard/trash',
              icon: <DeleteOutlined />,
              label: 'Корзина',
            },
          ]}
        />
      </div>
      <div className={'container'}>{children}</div>
    </main>
  );
};
