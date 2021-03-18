import {Injectable} from '@angular/core';

import {take} from 'rxjs/operators';

import * as firebase from 'firebase/app';
import '@firebase/firestore';

// Model
import {User} from '../../model/user';
import {Circle} from '../../model/circle';

// Resources and utils
import {Comparator} from '../utils/utils';

// Services
import {UserService} from '../user/user.service';
import {CircleService} from '../circle/circle.service';
import {SessionService} from '../session/session.service';
import {CircleStateService} from '../circle/circle-state.service';
import {ErrorService} from '../error/error.service';
import {CircleConnectionService} from '../circle/circe-connection.service';

@Injectable({
    providedIn: 'root'
})
export class UserCircleService {

    constructor(private userService: UserService,
                private circleService: CircleService,
                private sessionService: SessionService,
                private circleStateService: CircleStateService,
                private circleConnectionService: CircleConnectionService,
                private errorService: ErrorService) {

    }

    init(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                this.sessionService.watchUser().pipe(take(1)).subscribe(async (user: User) => {
                    if (!user || !user.data) {
                        resolve();
                        return;
                    }

                    // Init the circle
                    await this.circleService.init(user);

                    // Init the center user of the circle
                    await this.initWatchCenterUser();

                    resolve();
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    private initWatchCenterUser(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                this.circleService.watchCircle().pipe(take(1)).subscribe(async (circle: Circle) => {
                    if (circle && circle.data && circle.data.center && circle.data.center.user && Comparator.isStringNotEmpty(circle.data.center.user.id)) {
                        await this.userService.initWatchCircleCenterUser(circle.data.center.user.id);
                    }

                    resolve();
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    async destroy() {
        await this.userService.destroy();
        this.circleService.destroy();
    }

    createOrUpdateCenterUser(user: User): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                if (!user) {
                    reject('User is empty');
                    return;
                }

                if (Comparator.isStringEmpty(user.id)) {
                    const createdUser: User = await this.userService.createUser(user);

                    if (!createdUser) {
                        reject('User not created');
                        return;
                    }

                    await this.circleService.createCircle(createdUser);

                    user = await this.addUserCircleCenter(createdUser);

                    await this.sessionService.save(user);

                    await this.init();

                    await this.createCircleTodayState();
                }

                await this.userService.updateUser(user);

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    createOrUpdateConnectedUser(user: User, circle: Circle): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                if (!user) {
                    reject('User is empty');
                    return;
                }

                if (!circle || Comparator.isStringEmpty(circle.id)) {
                    reject('Circle is empty');
                    return;
                }

                if (Comparator.isStringEmpty(user.id)) {
                    user = await this.addUserCircleConnection(user, circle);

                    const createdUser: User = await this.userService.createUser(user);

                    if (!createdUser) {
                        reject('User not created');
                        return;
                    }

                    await this.userService.initWatchCircleConnectedUser(createdUser.id);

                    await this.circleConnectionService.createConnection(circle, createdUser);

                    // The "connections" array in circle (circle.data.connections) will be updated with a cloud function

                    await this.sessionService.save(createdUser);
                } else {
                    await this.userService.updateUser(user);
                }

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    private addUserCircleCenter(user: User): Promise<User> {
        return new Promise<User>((resolve) => {
            this.circleService.watchCircle().pipe(take(1)).subscribe(async (circle: Circle) => {
                if (circle) {
                    if (!Comparator.hasElements(user.data.circles_center)) {
                        user.data.circles_center = [];
                    }

                    user.data.circles_center.push(circle.ref);
                }

                resolve(user);
            });
        });
    }

    private createCircleTodayState(): Promise<void> {
        return new Promise<void>((resolve) => {
            this.circleService.watchCircle().pipe(take(1)).subscribe(async (circle: Circle) => {
                if (circle) {
                    try {
                        await this.circleStateService.createTodayState(circle.id);
                    } catch (err) {
                        this.errorService.error('ERROR.SHARE');
                    }
                }

                resolve();
            });
        });
    }

    private addUserCircleConnection(user: User, circle: Circle): Promise<User> {
        return new Promise<User>((resolve) => {
            if (!Comparator.hasElements(user.data.circles_connections)) {
                user.data.circles_connections = [];
            }

            user.data.circles_connections.push(circle.ref);

            resolve(user);
        });
    }

}
