import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';

import {TranslateModule} from '@ngx-translate/core';

import {CircleComponent} from './circle.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        RouterModule,
        TranslateModule.forChild()
    ],
    declarations: [CircleComponent],
    exports: [CircleComponent]
})
export class CircleComponentModule {
}
