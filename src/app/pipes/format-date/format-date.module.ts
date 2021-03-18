import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {TranslateModule} from '@ngx-translate/core';

import {FormatDatePipe} from './format-date.pipe';

@NgModule({
    declarations: [
        FormatDatePipe
    ],
    imports: [
        IonicModule,
        CommonModule,
        TranslateModule.forChild()
    ],
    exports: [
        FormatDatePipe
    ]
})
export class FormatDateModule {
}
