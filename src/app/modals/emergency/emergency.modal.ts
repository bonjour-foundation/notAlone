import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

import {Observable, Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

// Model
import {Circle} from '../../model/circle';
import {User} from '../../model/user';

// Resources
import {Resources} from '../../services/utils/resources';

// Services
import {GoogleAnalyticsService} from '../../services/analytics/google-analytics-service';
import {CircleService} from '../../services/circle/circle.service';
import {SessionService} from '../../services/session/session.service';
import {UserService} from '../../services/user/user.service';
import {CircleConnectionService} from '../../services/circle/circe-connection.service';
import {CircleConnection} from '../../model/circle-connection';

@Component({
    templateUrl: 'emergency.modal.html',
    styleUrls: ['./emergency.modal.scss'],
    selector: 'emergency'
})
export class EmergencyModal implements OnInit, OnDestroy {

    private circleSubscription: Subscription;
    private sessionSubscription: Subscription;

    circle: Circle;

    centerUser$: Observable<User>;

    circleConnections$: Observable<CircleConnection[]>;

    private sessionUser: User;

    constructor(private modalController: ModalController,
                private circleService: CircleService,
                private sessionService: SessionService,
                private userService: UserService,
                private googleAnalyticsService: GoogleAnalyticsService,
                private circleConnectionService: CircleConnectionService) {

    }

    async ngOnInit() {
        await this.googleAnalyticsService.trackView(Resources.Constants.GOOGLE.ANALYTICS.TRACKER.VIEW.EMERGENCY);

        this.centerUser$ = this.userService.watchCenterUser();

        this.sessionSubscription = this.sessionService.watchUser().subscribe(async (user: User) => {
            this.sessionUser = user;
        });

        this.circleSubscription = this.circleService.watchCircle().subscribe(async (circle: Circle) => {
            this.circle = circle;

            if (this.circle && this.circle.id) {
                this.circleConnections$ = this.circleConnectionService.findConnections(this.circle.id);
            }
        });
    }

    ngOnDestroy() {
        if (this.circleSubscription) {
            this.circleSubscription.unsubscribe();
        }

        if (this.sessionSubscription) {
            this.sessionSubscription.unsubscribe();
        }
    }

    @HostListener('document:ionBackButton', ['$event'])
    async overrideHardwareBackAction($event: any) {
        await this.close();
    }

    async close() {
        await this.modalController.dismiss();
    }

    // We don't filter the connectedUsers array but we rather hide the session user in the template
    // as we want to display the circle users with a their respective sorted color
    isSessionUser(userId: string): boolean {
        return this.sessionUser && this.sessionUser.id === userId;
    }
}
