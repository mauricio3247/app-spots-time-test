import firebaseClient  from 'firebase/app'
import 'firebase/auth';



if (typeof window !== 'undefined' && !firebaseClient.apps.length) {


    console.log('here', process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY)
    firebaseClient.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    });
    firebaseClient.auth().setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
    (window as any).firebase = firebaseClient;
}

export { firebaseClient };