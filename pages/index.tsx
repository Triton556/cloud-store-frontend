import Head from 'next/head';
import styles from '@/styles/Home.module.scss';
import { GetServerSidePropsContext } from 'next';
import { checkAuth } from '@/utils/checkAuth';

function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Hello World</h1>
      </main>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ('redirect' in authProps) {
    console.log('redirect index');
    return authProps;
  } else {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
};

export default Home;
