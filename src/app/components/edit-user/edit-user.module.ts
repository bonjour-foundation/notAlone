import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {TranslateModule} from '@ngx-translate/core';

import {EditUserComponent} from './edit-user.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        TranslateModule.forChild(),
        ReactiveFormsModule
    ],
    declarations: [EditUserComponent],
    exports: [EditUserComponent]
})
export class EditUserComponentModule {
}
