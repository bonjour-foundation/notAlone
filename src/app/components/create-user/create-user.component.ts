import {IonInput, LoadingController} from '@ionic/angular';
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Subscription} from 'rxjs';

// Model
import {User} from '../../model/user';
import {Circle} from '../../model/circle';
import {Share} from '../../model/share';

// Utils
import {Comparator} from '../../services/utils/utils';
import {Resources} from '../../services/utils/resources';

// Services
import {ShareService} from '../../services/share/share.service';
import {CircleService} from '../../services/circle/circle.service';
import {UserCircleService} from '../../services/user-circle/user-circle.service';
import {ErrorService} from '../../services/error/error.service';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit, OnDestroy {

    @ViewChild('email') private emailInput: IonInput;
    @ViewChild('firstName') private fistNameInput: IonInput;
    @ViewChild('lastName') private lastNameInput: IonInput;
    @ViewChild('phoneNumber') private phoneNumberInput: IonInput;
    @ViewChild('hashId') private hashIdInput: IonInput;

    @Input() email: string;
    @Input() firstName: string;
    @Input() lastName: string;

    private circleSubscription: Subscription;

    userForm: FormGroup;

    user: User;

    private circle: Circle;
    circleReachable = false;

    @Input()
    centerUser = true;

    @Output()
    private saved: EventEmitter<void> = new EventEmitter();

    private shareSubscription: Subscription;
    share: Share;

    constructor(private loadingController: LoadingController,
                private formBuilder: FormBuilder,
                private userCircleService: UserCircleService,
                private shareService: ShareService,
                private circleService: CircleService,
                private errorService: ErrorService) {
        this.userForm = this.formBuilder.group({
            email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
            first_name: new FormControl('', Validators.compose([Validators.required])),
            last_name: new FormControl('', Validators.compose([Validators.required])),
            phone_number: new FormControl('', Validators.compose([Validators.required])),
            hash_id: new FormControl()
        });
    }

    async ngOnInit() {
        this.initUser();

        await this.updateForm();

        this.shareSubscription = this.shareService.watch().subscribe(async (share: Share) => {
            this.resetCircle();

            if (share && share.data && Comparator.isStringNotEmpty(share.data.hash_id)) {
                this.share = share;
                this.userForm.controls['hash_id'].setValue(share.data.hash_id);

                await this.initWatchCircle(share);
            }
        });
    }

    private resetCircle() {
        this.circle = null;
        this.circleReachable = false;

        if (this.circleSubscription) {
            this.circleSubscription.unsubscribe();
            this.circleService.destroy();
        }
    }

    async updateShare() {
        const shareId: string = this.userForm.value.hash_id;

        if (shareId && shareId !== '') {
            await this.shareService.init(shareId);
        }
    }

    private async initWatchCircle(share: Share) {
        if (!share || !share.data || Comparator.isEmpty(share.data.circle) || Comparator.isStringEmpty(share.data.circle.id)) {
            return;
        }

        await this.circleService.initWatch(share.data.circle.id);
        this.circleSubscription = this.circleService.watchCircle().subscribe((circle: Circle) => {
            this.circle = circle;

            if (this.circle && this.circle.data && (!this.circle.data.connections || this.circle.data.connections.length < Resources.Constants.CIRCLE.MAX_CONNECTIONS)) {
                this.circleReachable = true;
            } else {
                this.circleReachable = false;
            }
        });
    }

    ngOnDestroy() {
        if (this.shareSubscription) {
            this.shareSubscription.unsubscribe();
        }

        if (this.circleSubscription) {
            this.circleSubscription.unsubscribe();
        }
    }

    private initUser() {
        if (Comparator.isEmpty(this.user)) {
            this.user = {
                id: null,
                ref: null,
                data: {
                    email: null,
                    first_name: null,
                    last_name: null,
                    phone_number: null
                }
            };
        }

        if (Comparator.isStringNotEmpty(this.email)) {
            this.user.data.email = this.email;
        }

        if (Comparator.isStringNotEmpty(this.lastName)) {
            this.user.data.last_name = this.lastName;
        }

        if (Comparator.isStringNotEmpty(this.firstName)) {
            this.user.data.first_name = this.firstName;
        }
    }

    private updateForm(): Promise<void> {
        return new Promise<void>((resolve) => {
            if (this.user && this.user.data) {
                this.userForm.controls['email'].setValue(this.user.data.email);
                this.userForm.controls['first_name'].setValue(this.user.data.first_name);
                this.userForm.controls['last_name'].setValue(this.user.data.last_name);
                this.userForm.controls['phone_number'].setValue(this.user.data.phone_number);
            }

            if (!this.centerUser) {
                this.userForm.controls['hash_id'].validator = Validators.compose([Validators.required]);
            }

            this.userForm.controls['email'].disable();

            resolve();
        });
    }

    async createOrUpdate() {
        const loading: HTMLIonLoadingElement = await this.loadingController.create({});

        await loading.present();

        try {
            await this.createOrUpdateUser();

            this.saved.emit();

            await loading.dismiss();
        } catch (err) {
            this.errorService.error('ERROR.CREATE_UPDATE_USER');
            await loading.dismiss();
        }
    }

    private async createOrUpdateUser() {
        const updateValues = {
            email: this.userForm.getRawValue().email,
            first_name: this.userForm.value.first_name,
            last_name: this.userForm.value.last_name,
            phone_number: this.userForm.value.phone_number
        };

        this.user.data = {...this.user.data, ...updateValues};

        await this.createOrUpdateCenterConnecterUser();
    }

    private createOrUpdateCenterConnecterUser(): Promise<void> {
        return this.centerUser ? this.userCircleService.createOrUpdateCenterUser(this.user) : this.userCircleService.createOrUpdateConnectedUser(this.user, this.circle);
    }

    async focusEmail() {
        await this.emailInput.setFocus();
    }

    async focusFirstName() {
        await this.fistNameInput.setFocus();
    }

    async focusLastName() {
        await this.lastNameInput.setFocus();
    }

    async focusPhoneNumber() {
        await this.phoneNumberInput.setFocus();
    }

    async focusHashId() {
        await this.hashIdInput.setFocus();
    }
}
