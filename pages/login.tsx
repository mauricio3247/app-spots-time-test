import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { firebaseClient } from '../helpers/client/firebase.client';
import { useAuth } from '../hooks/useAuth';

export default (_props: any) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { user } = useAuth();
  useEffect(()=> {
    if(user && user.uid) {
        window.location.href = '/'
    }

  },[user])
  return (
    <div>
      <Link href="/">
        <a>Go back to home page</a>
      </Link>
      <br />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={'Email'}
      />
      <input
        type={'password'}
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder={'Password'}
      />
      <button
        onClick={async () => {
          await firebaseClient
            .auth()
            .createUserWithEmailAndPassword(email, pass);
          window.location.href = '/';
        }}
      >
        Create account
      </button>
      <button
        onClick={async () => {
          await firebaseClient.auth().signInWithEmailAndPassword(email, pass);
          window.location.href = '/';
        }}
      >
        Log in
      </button>

      <button
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
      </button>
    </div>
  );
};