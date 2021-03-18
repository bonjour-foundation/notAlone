import {Component, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';

// Model
import {CircleRequestType, CircleStateData} from '../../model/circle-state';
import {User} from '../../model/user';

// Utils
import {Comparator} from '../../services/utils/utils';

@Component({
    selector: 'app-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnChanges {

    type: CircleRequestType;

    @Output()
    private select: EventEmitter<CircleRequestType> = new EventEmitter();

    @Input()
    isCenterUser = false;

    @Input()
    displayRequest = false;

    @Input()
    displayState: CircleStateData;

    @Input()
    centerUser: User;

    displayRequestType: CircleRequestType;

    PHONE: CircleRequestType = CircleRequestType.PHONE;
    HAND: CircleRequestType = CircleRequestType.HAND;
    SHOP: CircleRequestType = CircleRequestType.SHOP;
    GOOD: CircleRequestType = CircleRequestType.GOOD;

    @HostBinding('class.visible') visible = false;

    constructor(private translateService: TranslateService) {

    }

    async ngOnChanges(changes: SimpleChanges) {
        if (this.displayRequest && this.centerUser) {
            if (!this.isCenterUser) {
                this.visible = this.displayRequest && Comparator.isNotEmpty(this.displayState) && Comparator.isNotEmpty(this.displayState.request);
            } else {
                this.visible = this.displayRequest && this.isCenterUser;
            }

            this.displayRequestType = this.displayState && this.displayState.request ? this.displayState.request.type : null;
            this.type = this.displayRequestType;
        }
    }

    getIcon(type: CircleRequestType): string {
        return this.type === type ? 'assets/img/button/' + type.toString() + '-active.svg' : 'assets/img/button/' + type.toString() + '.svg';
    }

    getLabel(): string {
        if (this.type === CircleRequestType.SHOP) {
            return this.translateService.instant('REQUEST.VISIT');
        } else if (this.type === CircleRequestType.HAND) {
            return this.translateService.instant('REQUEST.HELP');
        } else if (this.type === CircleRequestType.PHONE) {
            return this.translateService.instant('REQUEST.PHONE_CALL');
        } else if (this.type === CircleRequestType.GOOD) {
            return this.translateService.instant('REQUEST.GOOD');
        } else {
            return undefined;
        }
    }

    selectType(type: CircleRequestType) {
        if (!this.isCenterUser) {
            return;
        }

        this.type = this.type === type ? null : type;
        this.select.emit(this.type);
    }
}
