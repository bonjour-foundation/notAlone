import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {TranslateModule} from '@ngx-translate/core';

import {IntroPage} from './intro.page';
import {IntroNavModule} from '../../components/intro-nav/intro-nav.module';
import {BackgroundCircleModule} from '../../components/background-circle/background-circle.module';

const routes: Routes = [
    {
        path: '',
        component: IntroPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
        IntroNavModule,
        BackgroundCircleModule
    ],
    declarations: [IntroPage],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IntroPageModule {
}
