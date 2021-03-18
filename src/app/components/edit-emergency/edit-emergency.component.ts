import {IonInput, LoadingController} from '@ionic/angular';
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

// Model
import {Circle} from '../../model/circle';

// Services
import {ErrorService} from '../../services/error/error.service';
import {CircleService} from '../../services/circle/circle.service';

@Component({
    selector: 'app-edit-emergency',
    templateUrl: './edit-emergency.component.html',
    styleUrls: ['./edit-emergency.component.scss'],
})
export class EditEmergencyComponent implements OnInit, OnChanges {

    @ViewChild('name') private nameInput: IonInput;
    @ViewChild('phoneNumber') private phoneNumberInput: IonInput;

    emergencyForm: FormGroup;

    @Input()
    circle: Circle;

    @Output()
    private saved: EventEmitter<void> = new EventEmitter();

    constructor(private loadingController: LoadingController,
                private formBuilder: FormBuilder,
                private circleService: CircleService,
                private errorService: ErrorService) {
        this.emergencyForm = this.formBuilder.group({
            name: new FormControl('', Validators.compose([Validators.required])),
            phone_number: new FormControl('', Validators.compose([Validators.required]))
        });
    }

    async ngOnInit() {
        await this.initForm();
    }

    async ngOnChanges(changes: SimpleChanges) {
        await this.updateForm();
    }

    private initForm(): Promise<void> {
        return new Promise<void>((resolve) => {
            if (this.circle && this.circle.data && this.circle.data.emergency) {
                this.emergencyForm.controls['name'].setValue(this.circle.data.emergency.name);
                this.emergencyForm.controls['phone_number'].setValue(this.circle.data.emergency.phone_number);
            }

            resolve();
        });
    }

    private updateForm(): Promise<void> {
        return new Promise<void>((resolve) => {
            if (this.circle && this.circle.data && this.circle.data.emergency) {
                if (!this.emergencyForm.value.name) {
                    this.emergencyForm.controls['name'].setValue(this.circle.data.emergency.name);
                }

                if (!this.emergencyForm.value.phone_number) {
                    this.emergencyForm.controls['phone_number'].setValue(this.circle.data.emergency.phone_number);
                }
            }

            resolve();
        });
    }

    async createOrUpdate() {
        const loading: HTMLIonLoadingElement = await this.loadingController.create({});

        await loading.present();

        try {
            await this.createOrUpdateEmergency();

            this.saved.emit();

            await loading.dismiss();
        } catch (err) {
            this.errorService.error('ERROR.CREATE_UPDATE_USER');
            await loading.dismiss();
        }
    }

    private async createOrUpdateEmergency() {
        const updateValues = {
            emergency: {
                name: this.emergencyForm.value.name,
                phone_number: this.emergencyForm.value.phone_number
            }
        };

        this.circle.data = {...this.circle.data, ...updateValues};

        await this.circleService.updateCircle(this.circle);
    }

    async focusName() {
        await this.nameInput.setFocus();
    }

    async focusPhoneNumber() {
        await this.phoneNumberInput.setFocus();
    }

}
