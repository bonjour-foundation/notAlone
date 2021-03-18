import {Injectable} from '@angular/core';

import {environment} from '../../../environments/environment';

// Services
import {GoogleAnalyticsPWAService} from './google-analytics-pwa-service';
import {GoogleAnalyticsCordovaService} from './google-analytics-cordova-service';

@Injectable({
    providedIn: 'root'
})
export class GoogleAnalyticsService {

    constructor(private googleAnalyticsCordovaService: GoogleAnalyticsCordovaService,
                private googleAnalyticsPWAService: GoogleAnalyticsPWAService) {

    }

    async trackView(viewName: string): Promise<void> {
        if (!environment.production) {
            return Promise.resolve();
        }

        if (environment.cordova) {
            return this.googleAnalyticsCordovaService.trackView(viewName);
        } else {
            return this.googleAnalyticsPWAService.trackView(viewName);
        }
    }

    async trackEvent(category: string, action: string): Promise<void> {
        if (!environment.production) {
            return Promise.resolve();
        }

        if (environment.cordova) {
            return this.googleAnalyticsCordovaService.trackEvent(category, action);
        } else {
            return this.googleAnalyticsPWAService.trackEvent(category, action);
        }
    }


}
