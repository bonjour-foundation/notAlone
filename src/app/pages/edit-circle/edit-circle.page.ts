import {IonRouterOutlet, NavController, ToastController} from '@ionic/angular';
import {Component, OnDestroy, OnInit} from '@angular/core';

import {Observable, Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

import {User} from '../../model/user';
import {Share} from '../../model/share';
import {Circle} from '../../model/circle';

import {Resources} from '../../services/utils/resources';

import {UserService} from '../../services/user/user.service';
import {ConnectedUsersService, ConnectedUser} from '../../services/user-circle/connected-users.service';
import {CircleService} from '../../services/circle/circle.service';
import {ShareService} from '../../services/share/share.service';
import {GoogleAnalyticsService} from '../../services/analytics/google-analytics-service';
import {ErrorService} from '../../services/error/error.service';
import {Comparator} from '../../services/utils/utils';

enum Selection {
    USER,
    EMERGENCY
}

@Component({
    selector: 'app-edit-circle',
    templateUrl: './edit-circle.page.html',
    styleUrls: ['./edit-circle.page.scss'],
})
export class EditCirclePage implements OnInit, OnDestroy {

    private circleSubscription: Subscription;
    private sharesSubscription: Subscription;

    centerUser$: Observable<User>;

    connectedUsers: ConnectedUser[] = [];

    private share: Share;
    shareId: string;

    circle: Circle;

    showUserPosition = 0;
    selectedUserEmpty = false;

    SELECTED_USER: Selection = Selection.USER;
    SELECTED_EMERGENCY: Selection = Selection.EMERGENCY;
    selected: Selection = Selection.USER;

    canGoBack = false;
    canGoBackLoaded = false;

    constructor(private routerOutlet: IonRouterOutlet,
                private toastController: ToastController,
                private navController: NavController,
                private userService: UserService,
                private circleService: CircleService,
                private shareService: ShareService,
                private connectedUsersService: ConnectedUsersService,
                private googleAnalyticsService: GoogleAnalyticsService,
                private errorService: ErrorService) {

    }

    async ngOnInit() {
        await this.googleAnalyticsService.trackView(Resources.Constants.GOOGLE.ANALYTICS.TRACKER.VIEW.EDIT_CIRCLE);

        this.centerUser$ = this.userService.watchCenterUser();

        this.circleSubscription = this.circleService.watchCircle().subscribe(async (circle: Circle) => {
            this.circle = circle;

            this.watchShares(circle);

            await this.getConnectedUsers();
        });

        this.selectCenterUser();
    }

    ngOnDestroy() {
        if (this.circleSubscription) {
            this.circleSubscription.unsubscribe();
        }

        if (this.sharesSubscription) {
            this.sharesSubscription.unsubscribe();
        }
    }

    ionViewWillEnter() {
        this.canGoBack = this.routerOutlet && this.routerOutlet.canGoBack();
        this.canGoBackLoaded = true;
    }

    async getConnectedUsers() {
        try {
            this.connectedUsers = await this.connectedUsersService.getConnectedUsers(this.circle, this.connectedUsers);
        } catch (err) {
            this.errorService.error('ERROR.CONNECTED_USERS');
        }
    }

    private watchShares(circle: Circle) {
        if (circle && circle.ref && !this.sharesSubscription) {
            this.sharesSubscription = this.shareService.findPendingCircleShare(circle.ref).subscribe(async (shares: Share[]) => {
                this.share = shares && shares.length > 0 ? shares[0] : null;

                try {
                    this.shareId = await this.initShareId();
                } catch (err) {
                    this.errorService.error('ERROR.SHARE');
                }
            });
        }
    }

    private initShareId(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            try {
                if (Comparator.isStringNotEmpty(this.shareId)) {
                    resolve(this.shareId);
                    return;
                }

                this.userService.watchCenterUser().pipe(take(1)).subscribe(async (userFrom: User) => {
                    const shareId: string = this.share && this.share.data ? this.share.data.hash_id : await this.shareService.create(userFrom, this.circle);
                    resolve(shareId);
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    selectCenterUser() {
        this.showUserPosition = 0;
        this.selectedUserEmpty = false;
        this.selected = Selection.USER;
    }

    selectEmergency() {
        this.showUserPosition = 4;
        this.selected = Selection.EMERGENCY;
    }

    selectConnectedUser(index: number) {
        this.selected = Selection.USER;

        this.showUserPosition = index + 1;

        if (!this.connectedUsers || this.connectedUsers.length <= index) {
            this.selectedUserEmpty = true;
            return;
        }

        this.selectedUserEmpty = false;
    }

    async createShare() {
        if (!this.centerUser$ || !this.circle) {
            return;
        }

        try {
            if (this.share && this.share.data) {
                await this.shareService.presentShare(this.share.data.hash_id);
            } else {
                this.centerUser$.pipe(take(1)).subscribe(async (user: User) => {
                    const shareId: string = await this.shareService.create(user, this.circle);
                    await this.shareService.presentShare(shareId);
                });
            }
        } catch (err) {
            this.errorService.error('ERROR.TODAY_STATE');
        }
    }
}
