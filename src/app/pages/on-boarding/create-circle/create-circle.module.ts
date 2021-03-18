import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {CreateCirclePage} from './create-circle.page';
import {TranslateModule} from '@ngx-translate/core';
import {CircleComponentModule} from '../../../components/circle/circle.module';

const routes: Routes = [
    {
        path: '',
        component: CreateCirclePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
        CircleComponentModule
    ],
    declarations: [CreateCirclePage]
})
export class CreateCirclePageModule {
}
