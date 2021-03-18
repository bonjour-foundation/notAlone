import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {CreateEmailPage} from './create-email.page';
import {TranslateModule} from '@ngx-translate/core';
import {CircleComponentModule} from '../../../components/circle/circle.module';
import {CreateEmailComponentModule} from '../../../components/create-email/create-email.module';

const routes: Routes = [
    {
        path: '',
        component: CreateEmailPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
        CircleComponentModule,
        CreateEmailComponentModule
    ],
    declarations: [CreateEmailPage]
})
export class CreateEmailPageModule {
}
