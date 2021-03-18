import {Injectable} from '@angular/core';

import {environment} from '../../../environments/environment';

// Services
import {FirebaseNotificationsPwaService} from './firebase-notifications-pwa-service';
import {FirebaseNotificationsNativeService} from './firebase-notifications-native-service';

@Injectable({
    providedIn: 'root'
})
export class FirebaseNotificationsService {

    constructor(private firebaseNotificationsPwaService: FirebaseNotificationsPwaService,
                private firebaseNotificationsNativeService: FirebaseNotificationsNativeService) {

    }

    init(): Promise<void> {
        if (environment.cordova) {
            return this.firebaseNotificationsNativeService.init();
        } else {
            return this.firebaseNotificationsPwaService.init();
        }
    }

    requestPermission(): Promise<void> {
        if (environment.cordova) {
            return this.firebaseNotificationsNativeService.requestPermission();
        } else {
            return this.firebaseNotificationsPwaService.requestPermission();
        }
    }

    destroy() {
        this.firebaseNotificationsNativeService.destroy();
    }
}
