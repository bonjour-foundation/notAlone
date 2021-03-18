import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-intro-nav',
    templateUrl: './intro-nav.component.html',
    styleUrls: ['./intro-nav.component.scss'],
})
export class IntroNavComponent {

    @Input() lastSlide = false;

    @Input() noSkip = false;

    @Input() transparent = false;

    @Output() skip: EventEmitter<void> = new EventEmitter<void>();

    @Output() next: EventEmitter<void> = new EventEmitter<void>();

}
