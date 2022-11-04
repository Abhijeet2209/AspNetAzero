import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { EmployeeServiceProxy, EmployeeListDto, ListResultDtoOfEmployeeListDto } from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: './easylab.component.html',
    animations: [appModuleAnimation()]
})

export class EasyLabComponent extends AppComponentBase {
     employeeList: EmployeeListDto[] = [];

    filter: string = '';
    constructor(
        injector: Injector,private _employeeService: EmployeeServiceProxy
    ) {
        super(injector);
    }
    ngOnInit(): void {
        this.getEmployee();
    }

    getEmployee(): void {
        this._employeeService.getPeople(this.filter).subscribe((result) => {
            this.employeeList = result.items;
        });
        
    }
}