import { Button } from 'antd';
import * as Api from '@/api';
import { useRouter } from 'next/router';

const LogoutButton: React.FC = () => {
  const router = useRouter();
  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      Api.auth.logout();
      window.location.reload();
    }
  };
  return (
    <Button onClick={onClickLogout} type={'primary'} danger>
      Выйти
    </Button>
  );
};

export default LogoutButton;
