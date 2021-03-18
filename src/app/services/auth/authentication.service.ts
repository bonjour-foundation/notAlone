import {Injectable} from '@angular/core';

import {Observable, ReplaySubject} from 'rxjs';

import {AngularFireAuth} from '@angular/fire/auth';

import {User as FirebaseUser} from 'firebase';

import {SessionService} from '../session/session.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private authUserSubject: ReplaySubject<FirebaseUser> = new ReplaySubject(1);

    constructor(private angularFireAuth: AngularFireAuth,
                private sessionService: SessionService) {
    }

    init(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                this.angularFireAuth.authState.subscribe(async (user: FirebaseUser) => {
                    await this.sessionService.init(user);

                    // First init session, so when we access the BehaviorSubject of the session we get the real actual value
                    this.authUserSubject.next(user);
                });

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    signOut(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                await this.angularFireAuth.auth.signOut();

                this.authUserSubject.next(null);

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    delete(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                await this.angularFireAuth.auth.currentUser.delete();

                this.authUserSubject.next(null);

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    watch(): Observable<FirebaseUser> {
        return this.authUserSubject.asObservable();
    }

    refreshToken(): Promise<string> {
        return this.angularFireAuth.auth.currentUser.getIdToken(true);
    }
}
