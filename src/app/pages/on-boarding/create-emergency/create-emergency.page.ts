import {Component, OnInit} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';

import {Observable} from 'rxjs';

// Model
import {Circle} from '../../../model/circle';

// Services
import {CircleService} from '../../../services/circle/circle.service';

@Component({
    selector: 'app-create-emergency',
    templateUrl: './create-emergency.page.html',
    styleUrls: ['./create-emergency.page.scss'],
})
export class CreateEmergencyPage implements OnInit {

    circle$: Observable<Circle>;

    constructor(private navController: NavController,
                private menuController: MenuController,
                private circleService: CircleService) {

    }

    async ngOnInit() {
        await this.menuController.enable(true);

        this.circle$ = this.circleService.watchCircle();
    }

    async navigate() {
        await this.navController.navigateForward('/share-circle');
    }
}
