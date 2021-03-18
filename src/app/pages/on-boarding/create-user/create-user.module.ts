import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {TranslateModule} from '@ngx-translate/core';

import {CreateUserPage} from './create-user.page';

import {CreateUserComponentModule} from '../../../components/create-user/create-user.module';
import {CircleComponentModule} from '../../../components/circle/circle.module';

const routes: Routes = [
    {
        path: '',
        component: CreateUserPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
        CreateUserComponentModule,
        CircleComponentModule
    ],
    declarations: [CreateUserPage]
})
export class CreateUserPageModule {
}
