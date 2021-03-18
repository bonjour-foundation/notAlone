import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';

import {TranslateModule} from '@ngx-translate/core';

import {BackgroundCircleComponent} from './background-circle.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        RouterModule,
        TranslateModule.forChild()
    ],
    declarations: [BackgroundCircleComponent],
    exports: [BackgroundCircleComponent]
})
export class BackgroundCircleModule {
}
