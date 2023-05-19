import { User } from '@/api/dto/user.dto';
import styles from '@/styles/Profile.module.scss';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactNode } from 'react';
import { Layout } from '@/Layouts/Layout';
import { checkAuth } from '@/utils/checkAuth';
import { GetServerSidePropsContext } from 'next';
import LogoutButton from '@/components/LogoutButton';

interface Props {
  userData: User;
}

const DashboardProfilePage: NextPageWithLayout<Props> = ({ userData }) => {
  return (
    <main>
      <div className={styles.root}>
        <h1>Мой профиль</h1>
        <br />
        <p>
          ID: <b>{userData.id}</b>
        </p>
        <p>
          Полное имя: <b>{userData.fullName}</b>
        </p>
        <p>
          E-mail: <b>{userData.email}</b>
        </p>
        <br />
        <LogoutButton />
      </div>
    </main>
  );
};

DashboardProfilePage.getLayout = (page: ReactNode) => {
  return <Layout title={'Dashboard / Профиль'}>{page}</Layout>;
};

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  return checkAuth(ctx);
};

export default DashboardProfilePage;
