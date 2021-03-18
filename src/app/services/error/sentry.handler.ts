import {ErrorHandler, Injectable} from '@angular/core';

import * as Sentry from '@sentry/browser';

import {environment} from '../../../environments/environment';

import {Resources} from '../utils/resources';

Sentry.init({
    dsn: Resources.Constants.SENTRY.DSN,
    release: environment.version,
    environment: environment.environment
});

@Injectable()
export class SentryHandler implements ErrorHandler {
    constructor() {
    }

    handleError(error) {
        if (environment.production) {
            Sentry.captureException(error.originalError || error);
        }

        throw error;
    }
}
