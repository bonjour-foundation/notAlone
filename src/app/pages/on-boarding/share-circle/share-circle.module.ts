import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {TranslateModule} from '@ngx-translate/core';

import {ShareCirclePage} from './share-circle.page';
import {CircleComponentModule} from '../../../components/circle/circle.module';
import {ShareComponentModule} from '../../../components/share/share.module';
import {ShareDisplayComponentModule} from '../../../components/share-display/share-display.module';

const routes: Routes = [
    {
        path: '',
        component: ShareCirclePage
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
        ShareComponentModule,
        ShareDisplayComponentModule
    ],
    declarations: [ShareCirclePage]
})
export class ShareCirclePageModule {
}
