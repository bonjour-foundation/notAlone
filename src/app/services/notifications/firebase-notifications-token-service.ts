import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FirebaseNotificationsTokenService {

    private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    private enablePushSubject: Subject<boolean> = new Subject<boolean>();

    next(token: string) {
        this.tokenSubject.next(token);
    }

    watchToken(): Observable<string> {
        return this.tokenSubject.asObservable();
    }

    enablePush(enable: boolean) {
        this.enablePushSubject.next(enable);
    }

    watchEnablePush(): Observable<boolean> {
        return this.enablePushSubject.asObservable();
    }

}
