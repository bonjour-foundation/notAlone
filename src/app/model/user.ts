import {DocumentReference} from '@angular/fire/firestore';

import * as firebase from 'firebase/app';

export interface UserPush {
    enabled?: boolean;
    fcm_token?: string;
}

export interface UserData {
    email?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;

    language?: string;
    platforms?: string[];

    push?: UserPush;

    circles_center?: DocumentReference[];
    circles_connections?: DocumentReference[];

    created_at?: firebase.firestore.Timestamp;
    updated_at?: firebase.firestore.Timestamp;
}

export interface User {
    id: string;
    ref: DocumentReference;

    data: UserData;
}
