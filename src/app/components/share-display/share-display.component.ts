import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-share-display',
    templateUrl: './share-display.component.html',
    styleUrls: ['./share-display.component.scss'],
})
export class ShareDisplayComponent {

    @Input()
    shareId: string;

}
