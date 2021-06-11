import React, { useEffect, useState } from 'react';
import { Button, Input, Layout } from 'antd';
import Text from 'antd/lib/typography/Text';
import { ItemLayout } from '../components/ItemLayout';
import {
  GoogleOutlined,
} from '@ant-design/icons';


import { useNotificationError } from '../hooks/useNotification';
import { firebaseClient } from '../helpers/client/firebase.client';
import { useAuth } from '../hooks/useAuth';

export default (_props: any) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { user } = useAuth();
  useEffect(() => {
    if (user && user.uid) {
      window.location.href = '/'
    }

  }, [user])

  const [error, setError] = useNotificationError()

  const signInWithEmailAndPassword = async () => {
    try {
      await firebaseClient
        .auth()
        .signInWithEmailAndPassword(email, pass);
      window.location.href = '/';
    } catch (error) {
      setError({ title: 'Auth Error', ...error })
    }

  }

  const signInWithProvider = async () => {
    try {
      await firebaseClient.auth().signInWithPopup(new firebaseClient.auth.GoogleAuthProvider())
      window.location.href = '/';
    } catch (error) {
      setError({ title: 'Auth Error', ...error })
    }

  }

  const createUserEmailAndPassword = async () => {
    try {
      await firebaseClient
        .auth()
        .createUserWithEmailAndPassword(email, pass);
      window.location.href = '/';
    } catch (error) {
      setError({ title: 'Auth Error', ...error })
    }

  }


  return (
    <Layout style={{ backgroundColor: 'white' }}>

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
            onClick={signInWithEmailAndPassword}>
            Login user/password
            </Button>
        </ItemLayout>

        <ItemLayout>
          <Button
            type="primary"
            icon={<GoogleOutlined />}
            onClick={signInWithProvider}
          >
            Log in With Google
        </Button>
        </ItemLayout>

        <ItemLayout>
          <>
            <Text>I don't have an account yet </Text>
            <Button onClick={createUserEmailAndPassword}>
              Click to create an account
            </Button>
          </>

        </ItemLayout>


      </Layout.Content>

    </Layout>



  );
};