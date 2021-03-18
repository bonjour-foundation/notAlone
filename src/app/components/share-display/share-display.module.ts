import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {TranslateModule} from '@ngx-translate/core';

import {ShareDisplayComponent} from './share-display.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        TranslateModule.forChild()
    ],
    declarations: [ShareDisplayComponent],
    exports: [ShareDisplayComponent]
})
export class ShareDisplayComponentModule {
}
