import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';

import {TranslateModule} from '@ngx-translate/core';

import {IntroNavComponent} from './intro-nav.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        TranslateModule.forChild(),
        RouterModule
    ],
    declarations: [IntroNavComponent],
    exports: [IntroNavComponent]
})
export class IntroNavModule {
}
