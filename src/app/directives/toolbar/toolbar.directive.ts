import {Directive, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';
import {TipsService} from '../../services/tips/tips.service';
import {Observable, Subscription} from 'rxjs';

@Directive({
    selector: '[appToolbar]'
})
export class ToolbarDirective implements OnInit, OnDestroy {

    tipsStateVisibleSubscription: Subscription;
    tipsCreateCircleVisibleSubscription: Subscription;
    tipsEditCircleVisibleSubscription: Subscription;

    tipsStateVisible: boolean;
    tipsCreateCircleVisible: boolean;
    tipsEditCircleVisible: boolean;

    constructor(private el: ElementRef,
                private renderer: Renderer2,
                private tipsService: TipsService) {
    }

    ngOnInit() {
        this.tipsStateVisibleSubscription = this.tipsService.watchTipsStateVisible().subscribe((state: boolean) => {
            this.tipsStateVisible = state;

            this.applyColor();
        });

        this.tipsCreateCircleVisibleSubscription = this.tipsService.watchTipsCreateCircleVisible().subscribe((state: boolean) => {
            this.tipsCreateCircleVisible = state;

            this.applyColor();
        });

        this.tipsEditCircleVisibleSubscription = this.tipsService.watchTipsEditCircleVisible().subscribe((state: boolean) => {
            this.tipsEditCircleVisible = state;

            this.applyColor();
        });
    }

    ngOnDestroy() {
        if (this.tipsStateVisibleSubscription) {
            this.tipsStateVisibleSubscription.unsubscribe();
        }

        if (this.tipsCreateCircleVisibleSubscription) {
            this.tipsCreateCircleVisibleSubscription.unsubscribe();
        }

        if (this.tipsEditCircleVisibleSubscription) {
            this.tipsEditCircleVisibleSubscription.unsubscribe();
        }
    }

    private applyColor() {
        this.renderer.setAttribute(this.el.nativeElement, 'color', this.tipsStateVisible || this.tipsCreateCircleVisible || this.tipsEditCircleVisible ? 'background-tips' : 'background');
    }

}
