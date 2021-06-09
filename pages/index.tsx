import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { Button } from 'antd';
import { GetServerSidePropsContext } from 'next';
import { authRequired } from '../helpers/server/auth.required';
import { firebaseClient } from '../helpers/client/firebase.client';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

  const user = await authRequired(ctx)
  if(user=== undefined){
      return { props: {} as never };
  }

  return {
    props: { message: `Your email is ${user.email} and your UID is ${user.uid}.` },
  } 
}

export default () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: '40px' }}>
      <p>{`User ID: ${user ? user.uid : 'no user signed in'}`}</p>
      
      <Button
        onClick={async () => {
          await firebaseClient.auth().signOut()
          window.location.href = '/login';
        }}
      > Logout </Button>

      <p>
        <Link href="/authenticated">
          <a>Go to authenticated route</a>
        </Link>
      </p>
      <p>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </p>
    </div>
  );
};