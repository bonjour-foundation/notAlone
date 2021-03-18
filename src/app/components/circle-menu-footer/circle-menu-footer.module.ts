import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';

import {TranslateModule} from '@ngx-translate/core';

import {CircleMenuFooterComponent} from './circle-menu-footer.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        TranslateModule.forChild(),
        RouterModule
    ],
    declarations: [CircleMenuFooterComponent],
    exports: [CircleMenuFooterComponent]
})
export class CircleMenuFooterModule {
}
