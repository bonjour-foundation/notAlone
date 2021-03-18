import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import {take} from 'rxjs/operators';

// Services
import {IntroService} from '../intro/intro.service';

@Injectable({
    providedIn: 'root'
})
export class TipsService {

    private tipsStateVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private tipsCreateCircleVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private tipsEditCircleVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

    // We display the smiley question "How are you today?" only once per session
    smileyQuestionDisplayedOnce = false;

    constructor(private introService: IntroService) {

    }

    watchTipsStateVisible(): Observable<boolean> {
        return this.tipsStateVisibleSubject.asObservable();
    }

    watchTipsCreateCircleVisible(): Observable<boolean> {
        return this.tipsCreateCircleVisibleSubject.asObservable();
    }

    watchTipsEditCircleVisible(): Observable<boolean> {
        return this.tipsEditCircleVisibleSubject.asObservable();
    }

    displayTipsState(): Promise<void> {
        return new Promise<void>(async (resolve) => {
            const shown: boolean = await this.introService.introTipsStateShown();

            if (shown) {
                resolve();
                return;
            }

            this.tipsStateVisibleSubject.next(true);

            resolve();
        });
    }

    hideTipsState(): Promise<void> {
        return new Promise<void>(async (resolve) => {
            this.watchTipsStateVisible().pipe(take(1)).subscribe(async (tipsStateVisible: boolean) => {
                if (!tipsStateVisible) {
                    resolve();
                    return;
                }

                await this.introService.setIntroTipsStateShown();
                this.tipsStateVisibleSubject.next(false);

                resolve();
            });
        });
    }

    displayTipsCreateCircle(): Promise<boolean> {
        return new Promise<boolean>(async (resolve) => {
            const shown: boolean = await this.introService.introTipsCreateCircleShown();

            if (shown) {
                resolve(false);
                return;
            }

            this.tipsCreateCircleVisibleSubject.next(true);

            resolve(true);
        });
    }

    hideTipsCreateCircle(): Promise<void> {
        return new Promise<void>(async (resolve) => {
            this.watchTipsCreateCircleVisible().pipe(take(1)).subscribe(async (tipsCreateCircleVisible: boolean) => {
                if (!tipsCreateCircleVisible) {
                    resolve();
                    return;
                }

                await this.introService.setIntroTipsCreateCircleShown();
                this.tipsCreateCircleVisibleSubject.next(false);

                resolve();
            });
        });
    }

    displayTipsEditCircle(): Promise<boolean> {
        return new Promise<boolean>(async (resolve) => {
            const shown: boolean = await this.introService.introTipsEditCircleShown();

            if (shown) {
                resolve(false);
                return;
            }

            this.tipsEditCircleVisibleSubject.next(true);

            resolve(true);
        });
    }

    hideTipsEditCircle(): Promise<void> {
        return new Promise<void>(async (resolve) => {
            this.watchTipsEditCircleVisible().pipe(take(1)).subscribe(async (tipsEditCircleVisible: boolean) => {
                if (!tipsEditCircleVisible) {
                    resolve();
                    return;
                }

                await this.introService.setIntroTipsEditCircleShown();
                this.tipsEditCircleVisibleSubject.next(false);

                resolve();
            });
        });
    }

    reset() {
        this.tipsStateVisibleSubject.next(false);
        this.tipsCreateCircleVisibleSubject.next(false);
        this.tipsEditCircleVisibleSubject.next(false);

        this.smileyQuestionDisplayedOnce = false;
    }
}
