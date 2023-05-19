import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import axios from '@/core/axios';
import * as Api from '@/api';

export const checkAuth = async (ctx: GetServerSidePropsContext) => {
  const { _token } = nookies.get(ctx);

  axios.defaults.headers.Authorization = 'Bearer ' + _token;

  try {
    const userData = (await Api.auth.getMe()).data;

    return { props: { userData } };
  } catch (err) {
    console.log('auth error: \n', err);
    return {
      redirect: {
        destination: '/dashboard/auth',
        permanent: false,
      },
    };
  }
};
