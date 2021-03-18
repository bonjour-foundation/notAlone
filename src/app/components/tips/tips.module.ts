import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {TranslateModule} from '@ngx-translate/core';

import {TipsComponent} from './tips.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        TranslateModule.forChild()
    ],
    declarations: [TipsComponent],
    exports: [TipsComponent]
})
export class TipsComponentModule {
}
