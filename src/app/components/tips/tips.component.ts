import {Component, OnInit} from '@angular/core';

// Services
import {TipsService} from '../../services/tips/tips.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-tips',
    templateUrl: './tips.component.html',
    styleUrls: ['./tips.component.scss'],
})
export class TipsComponent implements OnInit {

    tipsStateVisible$: Observable<boolean>;
    tipsCreateCircleVisible$: Observable<boolean>;
    tipsEditCircleVisible$: Observable<boolean>;

    constructor(private tipsService: TipsService) {

    }

    ngOnInit() {
        this.tipsStateVisible$ = this.tipsService.watchTipsStateVisible();
        this.tipsCreateCircleVisible$ = this.tipsService.watchTipsCreateCircleVisible();
        this.tipsEditCircleVisible$ = this.tipsService.watchTipsEditCircleVisible();
    }

}
