import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {TranslateModule} from '@ngx-translate/core';

import {EditEmergencyComponent} from './edit-emergency.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        TranslateModule.forChild(),
        ReactiveFormsModule
    ],
    declarations: [EditEmergencyComponent],
    exports: [EditEmergencyComponent]
})
export class EditEmergencyComponentModule {
}
