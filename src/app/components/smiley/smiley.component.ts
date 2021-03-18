import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';

import {isFuture, isSameDay} from 'date-fns';

import {Observable, Subject, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

// Model
import {CircleRequestType, CircleStateData, CircleStateType} from '../../model/circle-state';
import {User} from '../../model/user';
import {CircleReminder} from '../../model/circle';

// Utils
import {Comparator, Converter} from '../../services/utils/utils';

// Services
import {TipsService} from '../../services/tips/tips.service';
import {FormatDateService} from '../../services/format-date/format-date.service';

enum SmileyType {
    QUESTION
}

interface Smiley {
    type: SmileyType | CircleStateType;
    icon: string;
    iconInactive?: string;
    label?: string;
    style: string;
}

@Component({
    selector: 'app-smiley',
    templateUrl: './smiley.component.html',
    styleUrls: ['./smiley.component.scss'],
})
export class SmileyComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

    @Input()
    loading = false;

    @Input()
    isCenterUser = false;

    @Input()
    displayState: CircleStateData;

    @Input()
    emergency = false;

    @Input()
    centerUser: User;

    @Input()
    circleReminder: CircleReminder;

    smileys: Smiley[] = [
        {
            type: CircleStateType.SUPER,
            icon: 'assets/img/smiley/super.svg',
            iconInactive: 'assets/img/smiley/super-inactive.svg',
            label: 'SMILEY.STATE.SUPER',
            style: 'super'
        },
        {
            type: CircleStateType.WELL,
            icon: 'assets/img/smiley/well.svg',
            iconInactive: 'assets/img/smiley/well-inactive.svg',
            label: 'SMILEY.STATE.WELL',
            style: 'well'
        },
        {
            type: CircleStateType.OKAY,
            icon: 'assets/img/smiley/okay.svg',
            iconInactive: 'assets/img/smiley/okay-inactive.svg',
            label: 'SMILEY.STATE.OKAY',
            style: 'okay'
        },
        {
            type: CircleStateType.NOT_WELL,
            icon: 'assets/img/smiley/not-well.svg',
            iconInactive: 'assets/img/smiley/not-well-inactive.svg',
            label: 'SMILEY.STATE.NOT_WELL',
            style: 'not-well'
        },
        {
            type: CircleStateType.BAD,
            icon: 'assets/img/smiley/bad.svg',
            iconInactive: 'assets/img/smiley/bad-inactive.svg',
            label: 'SMILEY.STATE.BAD',
            style: 'bad'
        }
    ];

    smileyIndex = 0;

    private questionTimeout;
    private questionTransitionTimout;

    @Output()
    private state: EventEmitter<CircleStateType> = new EventEmitter();

    @Output()
    private requestType: EventEmitter<CircleRequestType> = new EventEmitter();

    @Output()
    private createCircle: EventEmitter<void> = new EventEmitter();

    @Output()
    private editCircle: EventEmitter<void> = new EventEmitter();

    @Output()
    private updateReminder: EventEmitter<void> = new EventEmitter();

    private selectState: Subject<SmileyType | CircleStateType> = new Subject();
    private subscription: Subscription;

    private userInteracted = false;

    tipsCreateCircleVisible = false;
    tipsEditCircleVisible = false;

    private tipsCreateCircleVisibleSubscription: Subscription;
    private tipsEditCircleVisibleSubscription: Subscription;

    private hideTipsStateSubscription: Subscription;
    private hideTipsStateSubject: Subject<void> = new Subject();

    displayRequest = false;

    constructor(private tipsService: TipsService,
                private formatDateService: FormatDateService) {

    }

    async ngOnInit() {
        if (this.displayQuestion()) {
            this.smileys = [{
                type: SmileyType.QUESTION,
                icon: 'assets/img/smiley/empty.svg',
                label: 'SMILEY.QUESTION',
                style: 'question'
            }, ...this.smileys];
        } else {
            this.smileyIndex = await this.initialSmileyIndex();
        }

        this.subscription = this.selectState.pipe(debounceTime(400)).subscribe(async (state: CircleStateType | SmileyType) => {
            this.displayRequest = true;

            if (state !== SmileyType.QUESTION) {
                this.state.emit(state as CircleStateType);
            }
        });

        this.hideTipsStateSubscription = this.hideTipsStateSubject.pipe(debounceTime(500)).subscribe(async () => {
            await this.tipsService.hideTipsState();
        });

        this.tipsCreateCircleVisibleSubscription = this.tipsService.watchTipsCreateCircleVisible().subscribe((state: boolean) => {
            this.tipsCreateCircleVisible = state;
        });

        this.tipsEditCircleVisibleSubscription = this.tipsService.watchTipsEditCircleVisible().subscribe((state: boolean) => {
            this.tipsEditCircleVisible = state;
        });
    }

    async ngOnChanges(changes: SimpleChanges) {
        if (changes && changes['displayState'] && !changes['displayState'].firstChange) {
            this.smileyIndex = await this.initialSmileyIndex();
        }
    }

    ngAfterViewInit() {
        if (this.displayQuestion()) {
            this.questionTimeout = setTimeout(async () => {
                await this.animateTransition();
            }, 2500);
        } else {
            Promise.resolve(null).then(() => this.displayRequest = true);
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        if (this.hideTipsStateSubscription) {
            this.hideTipsStateSubscription.unsubscribe();
        }

        if (this.tipsCreateCircleVisibleSubscription) {
            this.tipsCreateCircleVisibleSubscription.unsubscribe();
        }

        if (this.tipsEditCircleVisibleSubscription) {
            this.tipsEditCircleVisibleSubscription.unsubscribe();
        }
    }

    private initialSmileyIndex(): Promise<number> {
        return new Promise<number>((resolve) => {
            if (!this.displayState || !this.displayState.state) {
                resolve(this.displayQuestion() ? 1 : 0);
                return;
            }

            if (!this.smileys) {
                resolve(-1);
                return;
            }

            const index: number = this.smileys.findIndex((smiley: Smiley) => {
                return smiley.type === this.displayState.state;
            });

            resolve(index);
        });
    }

    async nextSmiley() {
        if (!this.isCenterUser) {
            return;
        }

        if (this.questionTimeout) {
            clearTimeout(this.questionTimeout);
            this.questionTimeout = null;
        }

        this.userInteracted = true;

        await this.animateTransition();

        this.emitCurrentState();
    }

    hasState(): boolean {
        return this.displayState && Comparator.isStringNotEmpty(this.displayState.state);
    }

    private emitCurrentState() {
        if (this.smileyIndex >= 0) {
            this.selectState.next(this.smileys[this.smileyIndex].type);
        }
    }

    private animateTransition(): Promise<void> {
        return new Promise<void>(async (resolve) => {
            if (this.displayQuestion() && !this.questionTransitionTimout && this.smileyIndex === 0 && this.smileys[0].type === SmileyType.QUESTION) {
                // Avoid glitch
                this.smileys[1].label = undefined;

                this.smileyIndex = await this.initialSmileyIndex();

                this.smileys[0].icon = this.smileys[this.smileyIndex].icon;
                this.smileys[0].label = undefined;

                await this.tipsService.displayTipsState();

                this.questionTransitionTimout = setTimeout(async () => {
                    this.tipsService.smileyQuestionDisplayedOnce = true;

                    this.smileys.splice(0, 1);
                    this.smileyIndex--;

                    // Redo label following workaround for glitch
                    this.smileys[0].label = 'SMILEY.STATE.SUPER';

                    this.questionTransitionTimout = null;

                    this.emitCurrentState();

                    resolve();
                }, this.userInteracted ? 0 : 400);
            } else {
                this.hideTipsStateSubject.next();
                this.tipsService.smileyQuestionDisplayedOnce = true;

                if (this.smileyIndex === this.smileys.length - 1) {
                    this.smileyIndex = 0;
                } else {
                    this.smileyIndex++;
                }

                resolve();
            }
        });
    }

    async selectRequestType(type: CircleRequestType) {
        this.requestType.emit(type);
    }

    emitCreateCircle() {
        this.createCircle.emit();
    }

    emitEditCircle() {
        if (!this.centerUser) {
            return;
        }

        this.editCircle.emit();
    }

    getCircleNextReminder(): string {
        if (!this.circleReminder || !this.circleReminder.next) {
            return null;
        }

        return this.formatDateService.transform(this.circleReminder.next);
    }

    isCircleNextReminderFuture(): boolean {
        if (!this.circleReminder || !this.circleReminder.next) {
            return false;
        }

        return isFuture(Converter.getDateObj(this.circleReminder.next));
    }

    navigateReminder() {
        this.updateReminder.next();
    }

    isTodayState(): boolean {
        return this.displayState && this.displayState.created_at && isSameDay(new Date(), Converter.getDateObj(this.displayState.created_at));
    }

    private displayQuestion(): boolean {
        return this.isCenterUser && !this.tipsService.smileyQuestionDisplayedOnce;
    }

    hasCenterUser(): boolean {
        return this.centerUser !== null;
    }
}
