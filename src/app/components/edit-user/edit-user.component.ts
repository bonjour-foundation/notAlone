import {IonInput, LoadingController} from '@ionic/angular';
import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

// Model
import {User} from '../../model/user';
import {Circle} from '../../model/circle';

// Utils
import {Comparator} from '../../services/utils/utils';

// Services
import {UserCircleService} from '../../services/user-circle/user-circle.service';
import {ErrorService} from '../../services/error/error.service';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {

    @ViewChild('firstName') private fistNameInput: IonInput;
    @ViewChild('lastName') private lastNameInput: IonInput;
    @ViewChild('phoneNumber') private phoneNumberInput: IonInput;

    userForm: FormGroup;

    @Input()
    user: User;

    @Input()
    circle: Circle;

    @Output()
    private saved: EventEmitter<void> = new EventEmitter();

    @Input()
    centerUser = true;

    constructor(private loadingController: LoadingController,
                private formBuilder: FormBuilder,
                private userCircleService: UserCircleService,
                private errorService: ErrorService) {
        this.userForm = this.formBuilder.group({
            first_name: new FormControl('', Validators.compose([Validators.required])),
            last_name: new FormControl('', Validators.compose([Validators.required])),
            phone_number: new FormControl('', Validators.compose([Validators.required])),
            hash_id: new FormControl()
        });
    }

    async ngOnInit() {
        this.initEmptyUser();

        await this.updateForm();
    }

    private initEmptyUser() {
        if (Comparator.isEmpty(this.user)) {
            this.user = {
                id: null,
                ref: null,
                data: {
                    first_name: null,
                    last_name: null,
                    phone_number: null
                }
            };
        }
    }

    private updateForm(): Promise<void> {
        return new Promise<void>((resolve) => {
            if (this.user && this.user.data) {
                this.userForm.controls['first_name'].setValue(this.user.data.first_name);
                this.userForm.controls['last_name'].setValue(this.user.data.last_name);
                this.userForm.controls['phone_number'].setValue(this.user.data.phone_number);
            }

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

    async focusFirstName() {
        await this.fistNameInput.setFocus();
    }

    async focusLastName() {
        await this.lastNameInput.setFocus();
    }

    async focusPhoneNumber() {
        await this.phoneNumberInput.setFocus();
    }

}
