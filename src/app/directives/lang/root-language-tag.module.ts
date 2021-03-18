import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {TranslateModule} from '@ngx-translate/core';

import {RootLanguageTagDirective} from './root-language-tag.directive';

@NgModule({
    declarations: [
        RootLanguageTagDirective
    ],
    imports: [
        IonicModule,
        CommonModule,
        TranslateModule.forChild()
    ],
    exports: [
        RootLanguageTagDirective
    ]
})
export class RootLanguageTagModule {
}
