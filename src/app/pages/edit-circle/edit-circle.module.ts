import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {TranslateModule} from '@ngx-translate/core';

import {EditCirclePage} from './edit-circle.page';
import {EditUserComponentModule} from '../../components/edit-user/edit-user.module';
import {CircleComponentModule} from '../../components/circle/circle.module';
import {ShareComponentModule} from '../../components/share/share.module';
import {EditEmergencyComponentModule} from '../../components/edit-emergency/edit-emergency.module';
import {ShareDisplayComponentModule} from '../../components/share-display/share-display.module';

const routes: Routes = [
    {
        path: '',
        component: EditCirclePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        EditUserComponentModule,
        CircleComponentModule,
        TranslateModule.forChild(),
        ShareComponentModule,
        ShareDisplayComponentModule,
        EditEmergencyComponentModule
    ],
    declarations: [EditCirclePage]
})
export class EditCirclePageModule {
}
