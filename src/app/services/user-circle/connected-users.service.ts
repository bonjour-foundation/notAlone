import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

// Model
import {User} from '../../model/user';
import {Circle} from '../../model/circle';

// Utils
import {Comparator, Converter} from '../utils/utils';

// Services
import {UserService} from '../user/user.service';
import {CircleConnectionService} from '../circle/circe-connection.service';
import {CircleConnection} from '../../model/circle-connection';

export interface ConnectedUser {
    userId: string;
    user$: Observable<User>;
    created_at: Date;
}

@Injectable({
    providedIn: 'root'
})
export class ConnectedUsersService {

    constructor(private userService: UserService,
                private circleConnectionService: CircleConnectionService) {

    }

    getConnectedUsers(circle: Circle, connectedUsers: ConnectedUser[]): Promise<ConnectedUser[]> {
        return new Promise<ConnectedUser[]>((resolve, reject) => {
            try {
                if (!circle || !circle.id || !circle.data) {
                    resolve(connectedUsers);
                    return;
                }

                if (Comparator.isEmpty(connectedUsers)) {
                    connectedUsers = [];
                }

                this.circleConnectionService.findConnections(circle.id).subscribe(async (connections: CircleConnection[]) => {
                    if (connections && connections.length > 0) {
                        for (const connection of connections) {
                            if (connection && connection.data && connection.data.user && connection.data.user.id) {
                                const ext: ConnectedUser = connectedUsers.find((connectedUser: ConnectedUser) => {
                                    return connectedUser.userId === connection.data.user.id;
                                });

                                if (!ext) {
                                    // Add user observable
                                    const watchUser$: Observable<User> = await this.userService.initWatchCircleConnectedUser(connection.data.user.id);

                                    connectedUsers.push({
                                        userId: connection.data.user.id,
                                        user$: watchUser$,
                                        created_at: Converter.getDateObj(connection.data.created_at)
                                    });
                                }
                            }
                        }
                    }

                    if (connectedUsers && connectedUsers.length > 0) {
                        const sortedConnectedUsers: ConnectedUser[] = connectedUsers.sort((a: ConnectedUser, b: ConnectedUser) => {
                            if (!a.created_at) {
                                return -1;
                            }

                            if (!b.created_at) {
                                return 1;
                            }

                            return a.created_at.getTime() - b.created_at.getTime();
                        });

                        resolve(sortedConnectedUsers);
                    } else {
                        resolve(connectedUsers);
                    }
                });
            } catch (err) {
                reject(err);
            }
        });
    }

}
