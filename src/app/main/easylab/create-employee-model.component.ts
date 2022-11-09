import { Component, ViewChild, Injector, ElementRef, Output, EventEmitter } from '@angular/core';
import { EmployeeServiceProxy, CreateEmployeeInput } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { finalize } from 'rxjs/operators';
import { ModalDirective} from 'ngx-bootstrap/modal';

@Component({
    selector: 'createEmployeeModal',
    templateUrl: './create-employee-modal.component.html'
})
export class CreateEmployeeModalComponent extends AppComponentBase {

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('modal' , { static: false }) modal: ModalDirective;
    @ViewChild('nameInput' , { static: false }) nameInput: ElementRef;

    employee: CreateEmployeeInput = new CreateEmployeeInput();

    active: boolean = false;
    saving: boolean = false;

    constructor(
        injector: Injector,
        private _employeeService: EmployeeServiceProxy
    ) {
        super(injector);
    }

    show(): void {
        this.active = true;
        this.employee = new CreateEmployeeInput();
        this.modal.show();
    }

    onShown(): void {
        this.nameInput.nativeElement.focus();
    }

    save(): void {
        this.saving = true;
        this._employeeService.createEmployee(this.employee)
            .pipe(finalize(() => this.saving = false))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(this.employee);
            });
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

}