import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {TranslateModule} from '@ngx-translate/core';

import {ToolbarDirective} from './toolbar.directive';

@NgModule({
    declarations: [
        ToolbarDirective
    ],
    imports: [
        IonicModule,
        CommonModule,
        TranslateModule.forChild()
    ],
    exports: [
        ToolbarDirective
    ]
})
export class ToolbarModule {
}
