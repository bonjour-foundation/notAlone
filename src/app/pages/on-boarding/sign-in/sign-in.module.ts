import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {TranslateModule} from '@ngx-translate/core';

import {SignInPage} from './sign-in-page.component';
import {CircleComponentModule} from '../../../components/circle/circle.module';

const routes: Routes = [
    {
        path: '',
        component: SignInPage
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
    declarations: [SignInPage]
})
export class SignInPageModule {
}
