import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {TranslateModule} from '@ngx-translate/core';

import {ShareComponent} from './share.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        TranslateModule.forChild()
    ],
    declarations: [ShareComponent],
    exports: [ShareComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShareComponentModule {
}
