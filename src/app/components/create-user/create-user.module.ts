import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {TranslateModule} from '@ngx-translate/core';

import {CreateUserComponent} from './create-user.component';

import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        RouterModule,
        TranslateModule.forChild(),
        ReactiveFormsModule
    ],
    declarations: [CreateUserComponent],
    exports: [CreateUserComponent]
})
export class CreateUserComponentModule {
}
