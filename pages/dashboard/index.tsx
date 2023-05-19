import { GetServerSidePropsContext } from 'next';
import { checkAuth } from '@/utils/checkAuth';
import { Layout } from '@/Layouts/Layout';
import { NextPageWithLayout } from '@/pages/_app';
import * as Api from '@/api';
import { DashboardLayout } from '@/Layouts/DashboardLayout';
import React from 'react';
import { Files } from '@/modules/Files';
import { FileItem } from '@/api/dto/files.dto';

interface Props {
  items: FileItem[];
}

const DashboardPage: NextPageWithLayout<Props> = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} withActions />
    </DashboardLayout>
  );
};

DashboardPage.getLayout = (page: React.ReactNode) => {
  return <Layout title={'Dashboard / Главная'}>{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = checkAuth(ctx);

  if ('redirect' in authProps) {
    return authProps;
  }

  try {
    const items = (await Api.files.getAll()).data;

    return {
      props: {
        items,
      },
    };
  } catch (err) {
    return {
      props: {
        items: [],
      },
    };
  }
};

export default DashboardPage;
