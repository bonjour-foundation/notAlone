import {Component, OnInit} from '@angular/core';

import {ActionSheetController, NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

import {take} from 'rxjs/operators';

import {TranslateService} from '@ngx-translate/core';

import {User} from '../../model/user';

import {Resources} from '../../services/utils/resources';

import {GoogleAnalyticsService} from '../../services/analytics/google-analytics-service';
import {SessionService} from '../../services/session/session.service';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {CircleService} from '../../services/circle/circle.service';
import {CircleStateService} from '../../services/circle/circle-state.service';
import {TipsService} from '../../services/tips/tips.service';
import {UserService} from '../../services/user/user.service';
import {ErrorService} from '../../services/error/error.service';

@Component({
    selector: 'app-settings',
    templateUrl: './account.page.html',
    styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

    sessionUser: User;

    actionInProgress = false;

    constructor(private actionSheetController: ActionSheetController,
                private navController: NavController,
                private storage: Storage,
                private translateService: TranslateService,
                private sessionService: SessionService,
                private errorService: ErrorService,
                private circleService: CircleService,
                private circleStateService: CircleStateService,
                private authenticationService: AuthenticationService,
                private tipsService: TipsService,
                private userService: UserService,
                private googleAnalyticsService: GoogleAnalyticsService) {

    }

    async ngOnInit() {
        await this.googleAnalyticsService.trackView(Resources.Constants.GOOGLE.ANALYTICS.TRACKER.VIEW.SETTINGS);

        this.sessionService.watchUser().pipe(take(1)).subscribe(async (user: User) => {
            this.sessionUser = user;
        });
    }

    private async showActionSheet(deleteAccount: boolean) {
        const actionSheet: HTMLIonActionSheetElement = await this.actionSheetController.create({
            header: this.translateService.instant(`ACCOUNT.${deleteAccount ? 'DELETE_ACCOUNT' : 'SIGN_OUT'}.QUESTION`),
            buttons: [
                {
                    text: this.translateService.instant(`ACCOUNT.${deleteAccount ? 'DELETE_ACCOUNT' : 'SIGN_OUT'}.ANSWER`),
                    role: 'destructive',
                    handler: async () => {
                        if (deleteAccount) {
                            await this.deleteAccount(actionSheet);
                        } else {
                            await this.signOut(actionSheet);
                        }
                    }
                }, {
                    text: this.translateService.instant('CORE.CANCEL'),
                    role: 'cancel',
                    handler: () => {
                        // Do nothing
                    }
                }
            ]
        });

        await actionSheet.present();
    }

    async showSignOutActionSheet() {
        this.showActionSheet(false);
    }

    async showDeleteActionSheet() {
        this.showActionSheet(true);
    }

    private signOut(actionSheet: HTMLIonActionSheetElement): Promise<void> {
        return new Promise<void>(async (resolve) => {
            await this.googleAnalyticsService.trackEvent(Resources.Constants.GOOGLE.ANALYTICS.TRACKER.EVENT.CATEGORY.SETTINGS, Resources.Constants.GOOGLE.ANALYTICS.TRACKER.EVENT.ACTION.SIGN_OUT);

            try {
                this.actionInProgress = true;

                await this.closeActionSheet(actionSheet);

                this.clearSession();

                await this.sessionService.enableUserPushNotifications(false);

                await this.authenticationService.signOut();

                await this.clearStorage();

                await this.redirect();

                resolve();
            } catch (err) {
                this.errorService.error('ERROR.AUTH.LOGOUT');
                this.actionInProgress = false;

                resolve();
            }
        });
    }

    private deleteAccount(actionSheet: HTMLIonActionSheetElement): Promise<void> {
        return new Promise<void>(async (resolve) => {
            await this.googleAnalyticsService.trackEvent(Resources.Constants.GOOGLE.ANALYTICS.TRACKER.EVENT.CATEGORY.SETTINGS, Resources.Constants.GOOGLE.ANALYTICS.TRACKER.EVENT.ACTION.DELETE_ACCOUNT);

            try {
                this.actionInProgress = true;

                await this.closeActionSheet(actionSheet);

                await this.authenticationService.refreshToken();

                this.clearSession();

                await this.authenticationService.delete();

                await this.clearStorage();

                await this.redirect();

                resolve();
            } catch (err) {
                this.actionInProgress = false;

                if (err && err.code === 'auth/requires-recent-login') {
                    this.errorService.error('ERROR.AUTH.REQUIRES_RECENT_LOGIN');
                    return;
                }

                this.errorService.error('ERROR.AUTH.DELETE');

                resolve();
            }
        });
    }

    private async closeActionSheet(actionSheet: HTMLIonActionSheetElement) {
        if (actionSheet) {
            await actionSheet.dismiss();
        }
    }

    private clearSession() {
        this.circleService.reset();
        this.circleStateService.reset();
        this.tipsService.reset();
        this.userService.reset();
        this.sessionService.reset();
    }

    private async clearStorage() {
        await this.storage.clear();
    }

    private async redirect() {
        await this.navController.navigateRoot('/intro', {animated: true});
    }
}
