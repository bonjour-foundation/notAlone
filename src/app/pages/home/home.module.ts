import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {TranslateModule} from '@ngx-translate/core';

import {HomePage} from './home.page';

import {SmileyComponentModule} from '../../components/smiley/smiley.module';
import {EmergencyModalModule} from '../../modals/emergency/emergency.module';
import {TipsComponentModule} from '../../components/tips/tips.module';
import {ToolbarModule} from '../../directives/toolbar/toolbar.module';
import {BackgroundCircleModule} from '../../components/background-circle/background-circle.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ]),
        TranslateModule.forChild(),
        SmileyComponentModule,
        EmergencyModalModule,
        TipsComponentModule,
        ToolbarModule,
        BackgroundCircleModule
    ],
    declarations: [HomePage]
})
export class HomePageModule {
}
