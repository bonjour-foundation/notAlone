import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-create-email-page',
    templateUrl: './create-email.page.html',
    styleUrls: ['./create-email.page.scss'],
})
export class CreateEmailPage implements OnInit {

    centerUser = true;

    constructor(private navController: NavController,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        if (this.activatedRoute.snapshot.paramMap.get('centerUser') === 'false') {
            this.centerUser = false;
        }
    }

    async navigateCreateUser() {
        await this.navController.navigateForward(['/create-user', this.centerUser], {animated: true});
    }

    async navigateHome() {
        await this.navController.navigateRoot('/home', {animated: true});
    }

    async navigateResetPassword() {
        await this.navController.navigateForward(['/request-reset-password', this.centerUser], {animated: true});
    }
}
