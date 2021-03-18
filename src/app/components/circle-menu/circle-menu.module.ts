import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';

import {TranslateModule} from '@ngx-translate/core';

import {CircleMenuComponent} from './circle-menu.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        TranslateModule.forChild(),
        RouterModule
    ],
    declarations: [CircleMenuComponent],
    exports: [CircleMenuComponent]
})
export class CircleMenuModule {
}
