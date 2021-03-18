import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {CreateEmergencyPage} from './create-emergency.page';
import {EditEmergencyComponentModule} from '../../../components/edit-emergency/edit-emergency.module';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
    {
        path: '',
        component: CreateEmergencyPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
        EditEmergencyComponentModule
    ],
    declarations: [CreateEmergencyPage]
})
export class CreateEmergencyPageModule {
}
