import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-request-reset-password-page',
    templateUrl: './request-reset-password.page.html',
    styleUrls: ['./request-reset-password.page.scss'],
})
export class RequestResetPasswordPage implements OnInit {

    centerUser = true;

    done = false;

    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        if (this.activatedRoute.snapshot.paramMap.get('centerUser') === 'false') {
            this.centerUser = false;
        }
    }

    resetPasswordSent() {
        this.done = true;
    }

}
