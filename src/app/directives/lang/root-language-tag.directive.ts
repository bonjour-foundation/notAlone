import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';

@Directive({
    selector: '[appRootTagLang]'
})
export class RootLanguageTagDirective implements OnInit {

    constructor(private el: ElementRef,
                private renderer: Renderer2,
                private translateService: TranslateService) {
    }

    ngOnInit() {
        this.setTagLang(this.translateService.currentLang);
    }

    private setTagLang(lang: string) {
        if (!this.el.nativeElement.parentElement) {
            // No app-root
            return;
        }

        if (!this.el.nativeElement.parentElement.parentElement) {
            // No body
            return;
        }

        if (!this.el.nativeElement.parentElement.parentElement.parentElement) {
            // No html element
            return;
        }

        this.renderer.setAttribute(this.el.nativeElement.parentElement.parentElement.parentElement, 'lang', lang);
    }

}
