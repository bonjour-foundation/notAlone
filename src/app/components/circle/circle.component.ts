import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-circle',
    templateUrl: './circle.component.html',
    styleUrls: ['./circle.component.scss'],
})
export class CircleComponent {

    @Input()
    small = false;

    @Input()
    highlightCenter = true;

    @Input()
    highlightTop = false;

    @Input()
    highlightLeft = false;

    @Input()
    highlightRight = false;

}
