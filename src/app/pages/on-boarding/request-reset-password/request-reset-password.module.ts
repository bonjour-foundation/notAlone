import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {RequestResetPasswordPage} from './request-reset-password.page';

import {TranslateModule} from '@ngx-translate/core';

import {CircleComponentModule} from '../../../components/circle/circle.module';
import {RequestResetPasswordComponentModule} from '../../../components/request-reset-password/request-reset-password.module';

const routes: Routes = [
    {
        path: '',
        component: RequestResetPasswordPage
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
        RequestResetPasswordComponentModule
    ],
    declarations: [RequestResetPasswordPage]
})
export class RequestResetPasswordPageModule {
}
