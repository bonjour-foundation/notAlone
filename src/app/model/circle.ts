import {DocumentReference} from '@angular/fire/firestore';

import * as firebase from 'firebase/app';

export interface CircleEmergency {
    name: string;
    phone_number: string;
}

export interface CircleReminder {
    next: firebase.firestore.Timestamp;
    alarm_at: firebase.firestore.Timestamp;
}

export interface CircleCenter {
    user: DocumentReference;

    first_name?: string;
    last_name?: string;
    phone_number?: string;

    language?: string;
}

export interface CircleData {
    center: CircleCenter;

    connections?: DocumentReference[];

    emergency?: CircleEmergency;

    reminder?: CircleReminder;

    created_at?: firebase.firestore.Timestamp;
    updated_at?: firebase.firestore.Timestamp;
}

export interface Circle {
    id: string;
    ref: DocumentReference;

    data: CircleData;
}
