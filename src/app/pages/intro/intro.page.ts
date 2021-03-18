import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavController} from '@ionic/angular';

import {Subscription} from 'rxjs';

import {Resources} from '../../services/utils/resources';

import {IntroService} from '../../services/intro/intro.service';
import {ShareService} from '../../services/share/share.service';
import {GoogleAnalyticsService} from '../../services/analytics/google-analytics-service';

@Component({
    selector: 'app-intro',
    templateUrl: './intro.page.html',
    styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit, OnDestroy {

    @ViewChild('introSlider') private deck: ElementRef;

    private shareSubscription: Subscription;
    private pendingShare = false;

    lastSlide = false;
    slideIndex = 0;

    constructor(private navController: NavController,
                private introService: IntroService,
                private shareService: ShareService,
                private googleAnalyticsService: GoogleAnalyticsService) {

    }

    async ngOnInit() {
        await this.googleAnalyticsService.trackView(Resources.Constants.GOOGLE.ANALYTICS.TRACKER.VIEW.INTRO);

        this.shareSubscription = this.shareService.watchPending().subscribe((pending: boolean) => {
            this.pendingShare = pending;
        });
    }

    ngOnDestroy() {
        if (this.shareSubscription) {
            this.shareSubscription.unsubscribe();
        }
    }

    async navigate(skip: boolean) {
        await this.googleAnalyticsService.trackEvent(Resources.Constants.GOOGLE.ANALYTICS.TRACKER.EVENT.CATEGORY.INTRO,
            skip ? Resources.Constants.GOOGLE.ANALYTICS.TRACKER.EVENT.ACTION.SKIP :
                Resources.Constants.GOOGLE.ANALYTICS.TRACKER.EVENT.ACTION.NAVIGATE
        );

        try {
            await this.introService.setIntroShown();
        } catch (e) {
            // We ignore the error and navigate in any case
        }

        if (this.pendingShare) {
            await this.navController.navigateRoot(['/signin', false], {animated: true});
        } else {
            await this.navController.navigateRoot('/home', {animated: true});
        }
    }

    async next() {
        if (!this.deck) {
            return;
        }

        try {
            const end: boolean = await this.deck.nativeElement.isEnd();

            if (end) {
                await this.navigate(false);
            } else {
                await this.deck.nativeElement.slideNext();
                await this.updateLastSlide();
            }
        } catch (err) {
            // Do nothing
        }
    }

    async updateLastSlide() {
        try {
            this.lastSlide = await this.deck.nativeElement.isEnd();
            this.slideIndex = await this.deck.nativeElement.getActiveIndex();
        } catch (err) {
            // Do nothing
        }
    }

}
