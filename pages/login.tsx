import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { firebaseClient } from '../helpers/client/firebase.client';
import { useAuth } from '../hooks/useAuth';
import { Button, Col, Input, Layout, notification, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { ItemLayout } from '../components/ItemLayout';

import {
  GoogleOutlined,
} from '@ant-design/icons';
import { useNotificationError } from '../hooks/useNotification';
import Text from 'antd/lib/typography/Text';

export default (_props: any) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { user } = useAuth();
  useEffect(()=> {
    if(user && user.uid) {
        window.location.href = '/'
    }

  },[user])

  const [error, setError] = useNotificationError()



  return (
    <Layout style={{backgroundColor: 'white'}}>

    <Layout.Content style={{ margin: '24px 16px 0', textAlign: 'center' }}>

      <ItemLayout>
        <h1>Login</h1>
      </ItemLayout>

      <ItemLayout>
        <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={'Email'}
          />
      </ItemLayout>


      <ItemLayout>
      <Input
            type={'password'}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder={'Password'}
          />
      </ItemLayout>

      <ItemLayout>
        <Button
              onClick={async () => {
                try {
                  await firebaseClient
                  .auth()
                  .signInWithEmailAndPassword(email, pass);
                window.location.href = '/';
                } catch (error) {
                  console.error('error', error)
                  setError({title: 'Auth Error', ...error})
                }

              }}
            >
              Login user/password
            </Button>
      </ItemLayout>

      <ItemLayout>
      <Button
          icon={<GoogleOutlined/>}
          onClick={async () => {
              try {
                  await firebaseClient.auth().signInWithPopup(new firebaseClient.auth.GoogleAuthProvider())
                  window.location.href = '/';
              } catch (error) {
                  console.error('error', error)
                  
              }

          }}
        >
          Log in With Google
        </Button>
      </ItemLayout>

      <ItemLayout>
        <>
        <Text>I don't have an account yet </Text>
        <Button
              onClick={async () => {
                try {
                  await firebaseClient
                  .auth()
                  .createUserWithEmailAndPassword(email, pass);
                window.location.href = '/';
                } catch (error) {
                  console.error('error', error)
                  setError({title: 'Auth Error', ...error})
                }

              }}
            >
              Click to create an account
            </Button>
        </>

      </ItemLayout>


</Layout.Content>

</Layout>



  );
};