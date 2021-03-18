import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

import {Observable, Subscription} from 'rxjs';

// Model
import {User, UserData} from '../../../model/user';

// Utils
import {Resources} from '../../../services/utils/resources';

// Services
import {GoogleAnalyticsService} from '../../../services/analytics/google-analytics-service';
import {UserService} from '../../../services/user/user.service';
import {take} from 'rxjs/operators';
import {Circle} from '../../../model/circle';
import {CircleService} from '../../../services/circle/circle.service';

@Component({
    selector: 'app-done',
    templateUrl: './done.page.html',
    styleUrls: ['./done.page.scss'],
})
export class DonePage implements OnInit, OnDestroy {

    centerUser = true;

    private subscription: Subscription;
    circleCenter: UserData;

    constructor(private activatedRoute: ActivatedRoute,
                private navController: NavController,
                private menuController: MenuController,
                private userService: UserService,
                private circleService: CircleService,
                private googleAnalyticsService: GoogleAnalyticsService) {

    }

    async ngOnInit() {
        await this.googleAnalyticsService.trackView(Resources.Constants.GOOGLE.ANALYTICS.TRACKER.VIEW.DONE);

        await this.menuController.enable(true);

        this.circleService.watchCircle().pipe(take(1)).subscribe((circle: Circle) => {
            if (circle && circle.data && circle.data.center && circle.data.center.user) {
                this.subscription = this.userService.getUser(circle.data.center.user.id).subscribe((userData: UserData) => {
                    this.circleCenter = userData;
                });
            }
        });

        // Default true
        if (this.activatedRoute.snapshot.paramMap.get('centerUser')) {
            this.centerUser = false;
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    async navigate() {
        await this.navController.navigateRoot('/home', {animated: true});
    }

}
