import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

import {Resources} from '../../../services/utils/resources';

import {GoogleAnalyticsService} from '../../../services/analytics/google-analytics-service';
import {TipsService} from '../../../services/tips/tips.service';

@Component({
    selector: 'app-create-circle',
    templateUrl: './create-circle.page.html',
    styleUrls: ['./create-circle.page.scss'],
})
export class CreateCirclePage implements OnInit {

    constructor(private navController: NavController,
                private tipsService: TipsService,
                private googleAnalyticsService: GoogleAnalyticsService) {

    }

    async ngOnInit() {
        await this.googleAnalyticsService.trackView(Resources.Constants.GOOGLE.ANALYTICS.TRACKER.VIEW.CREATE_CIRCLE);
    }

    async ionViewDidEnter() {
        await this.tipsService.hideTipsCreateCircle();
    }

    async navigateCreateUser() {
        await this.navController.navigateForward(['/signin', false], {animated: true});
    }

}
