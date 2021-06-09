import { createContext, useEffect, useState } from 'react';
import {firebaseClient} from '../helpers/client/firebase.client'
import nookies from 'nookies'
export const AuthContext = createContext<{ user: firebaseClient.User | null }>({
  user: null,
});

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<firebaseClient.User | null>(null);

    useEffect(() => {
      return firebaseClient.auth().onIdTokenChanged(async (user) => {
        if (!user) {
          setUser(null);
          nookies.set(undefined, 'token', '', { path: '/' });
        } else {
          const token = await user.getIdToken();
          setUser(user);
          nookies.set(undefined, 'token', token, { path: '/' });
        }
      });
    }, []);

    useEffect(() => {
        const handle = setInterval(async () => {
          const user = firebaseClient.auth().currentUser;
          if (user) await user.getIdToken(true);
        }, 10 * 60 * 1000);
    
        // clean up setInterval
        return () => clearInterval(handle);
      }, []);
  
    return (
      <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
}