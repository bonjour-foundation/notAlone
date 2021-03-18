import {writeFile} from 'fs';

import {name, version} from './package.json';

const targetPath = './src/environments/environment.prod.ts';

require('dotenv').config();

const envConfigFile = `export const environment = {
   production: true,
   cordova: true,
   environment: 'production',
   firebase: {
     apiKey: '${process.env.FIREBASE_API_KEY}',
     authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
     databaseURL: '${process.env.FIREBASE_DATABASE_URL}',
     projectId: '${process.env.FIREBASE_PROJECT_ID}',
     storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
     messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
     appId: '${process.env.FIREBASE_APP_ID}',
     measurementId: '${process.env.FIREBASE_MEASUREMENT_ID}',
     vapidKey: '${process.env.FIREBASE_VAPID_KEY}',
     webClientId: '${process.env.FIREBASE_WEB_CLIENT_ID}'
   },
   name: '${name}',
   version: '${version}'
};
`;

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
    if (err) {
        return console.log(err);
    }
});
