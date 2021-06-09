import nookies from 'nookies';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { firebaseAdmin } from './firebase.server';
export const authRequired = async (ctx: GetServerSidePropsContext) => {
    try {
      const cookies = nookies.get(ctx);
      const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
      const { uid, email } = token;
      return { uid, email};
    } catch (err) {
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
      return 
    }
}