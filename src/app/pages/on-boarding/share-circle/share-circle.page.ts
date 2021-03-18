import {NavController} from '@ionic/angular';
import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

// Model
import {User} from '../../../model/user';
import {Circle} from '../../../model/circle';
import {Share} from '../../../model/share';

// Resources
import {Resources} from '../../../services/utils/resources';
import {Comparator} from '../../../services/utils/utils';

// Services
import {ShareService} from '../../../services/share/share.service';
import {UserService} from '../../../services/user/user.service';
import {CircleService} from '../../../services/circle/circle.service';
import {ConnectedUsersService} from '../../../services/user-circle/connected-users.service';
import {GoogleAnalyticsService} from '../../../services/analytics/google-analytics-service';
import {ErrorService} from '../../../services/error/error.service';

@Component({
    selector: 'app-share-circle',
    templateUrl: './share-circle.page.html',
    styleUrls: ['./share-circle.page.scss'],
})
export class ShareCirclePage implements OnInit, OnDestroy {

    private sharesSubscription: Subscription;

    private share: Share;

    circle: Circle;

    private shareId: string;

    constructor(private navController: NavController,
                private userService: UserService,
                private circleService: CircleService,
                private shareService: ShareService,
                private connectedUsersService: ConnectedUsersService,
                private googleAnalyticsService: GoogleAnalyticsService,
                private errorService: ErrorService) {

    }

    async ngOnInit() {
        await this.googleAnalyticsService.trackView(Resources.Constants.GOOGLE.ANALYTICS.TRACKER.VIEW.SHARE_CIRCLE);

        this.circleService.watchCircle().pipe(take(1)).subscribe((circle: Circle) => {
            this.circle = circle;

            this.watchShares(circle);
        });
    }

    ngOnDestroy() {
        if (this.sharesSubscription) {
            this.sharesSubscription.unsubscribe();
        }
    }

    async createShare() {
        try {
            if (Comparator.isStringEmpty(this.shareId)) {
                this.shareId = await this.initShareId();
            }

            await this.shareService.presentShare(this.shareId);
        } catch (err) {
            this.errorService.error('ERROR.SHARE');
        }
    }

    private watchShares(circle: Circle) {
        if (circle && circle.ref) {
            if (this.sharesSubscription) {
                return;
            }

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

    async navigate() {
        await this.navController.navigateRoot('/done', {animated: true});
    }
}
