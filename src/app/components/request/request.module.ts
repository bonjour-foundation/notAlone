import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {TranslateModule} from '@ngx-translate/core';

import {RequestComponent} from './request.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        TranslateModule.forChild()
    ],
    declarations: [RequestComponent],
    exports: [RequestComponent]
})
export class RequestComponentModule {
}
