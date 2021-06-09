import * as firebaseAdmin from 'firebase-admin'


/**/

const getApiKeyPrivate = () => {
    return process.env.FIREBASE_PRIVATE_KEY 
}

if (typeof window === 'undefined' && !firebaseAdmin.apps.length) {

    const apiKey = getApiKeyPrivate()
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
            privateKey: apiKey ? JSON.parse(apiKey): undefined,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            projectId: process.env.FIREBASE_PROJECT_ID,
        }),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
}

export { firebaseAdmin };