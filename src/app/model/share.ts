import {DocumentReference} from '@angular/fire/firestore';

import * as firebase from 'firebase/app';

export interface ShareData {
    hash_id?: string;

    expire_at: firebase.firestore.Timestamp;

    circle: DocumentReference;

    user_from: DocumentReference;
    user_to?: DocumentReference;

    created_at: firebase.firestore.Timestamp;
    updated_at: firebase.firestore.Timestamp;
}

export interface Share {
    id: string;
    ref: DocumentReference;

    data: ShareData;
}
