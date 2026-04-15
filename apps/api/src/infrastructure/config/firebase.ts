import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { logger } from './logger';

dotenv.config();

if (!admin.apps.length) {

    if (process.env.NODE_ENV === 'development') {
        const privateKey = process.env.FIREBASE_PRIVATE_KEY
            ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
            : undefined;

        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: privateKey,
            })
        });
        logger.info('Firebase inicializado con credenciales locales (.env)');
    }
    else {
        admin.initializeApp();
        logger.info('Firebase inicializado usando Application Default Credentials (GCP)');
    }
}

export const db = admin.firestore();