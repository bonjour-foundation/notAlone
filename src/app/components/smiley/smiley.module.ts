import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {TranslateModule} from '@ngx-translate/core';

import {SmileyComponent} from './smiley.component';
import {RequestComponentModule} from '../request/request.module';
import {FormatDateModule} from '../../pipes/format-date/format-date.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        TranslateModule.forChild(),
        RequestComponentModule,
        FormatDateModule
    ],
    declarations: [SmileyComponent],
    exports: [SmileyComponent]
})
export class SmileyComponentModule {
}
