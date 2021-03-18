import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {TranslateModule} from '@ngx-translate/core';

import {CreateEmailComponent} from './create-email.component';

import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        RouterModule,
        TranslateModule.forChild(),
        ReactiveFormsModule
    ],
    declarations: [CreateEmailComponent],
    exports: [CreateEmailComponent]
})
export class CreateEmailComponentModule {
}
