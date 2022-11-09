import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { EmployeeServiceProxy, EmployeeListDto, ListResultDtoOfEmployeeListDto } from '@shared/service-proxies/service-proxies';
import { remove as _remove } from 'lodash-es';
import {
    ConfirmBoxInitializer,
    DialogLayoutDisplay,
    DisappearanceAnimation,
    AppearanceAnimation
  } from '@costlydeveloper/ngx-awesome-popup';
import { Console } from 'console';

@Component({
    templateUrl: './easylab.component.html',
    //styleUrls: ['./ealsylab.component.less'],
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
        console.log(this.permission);
    }

    getEmployee(): void {
        this._employeeService.getPeople(this.filter).subscribe((result) => {
            this.employeeList = result.items;
        });
        
    }
    deleteEmployee(employee:EmployeeListDto):void
    {

            const confirmBox = new ConfirmBoxInitializer();
    
            confirmBox.setTitle('Are you sure?');
    
            confirmBox.setMessage('Confirm to delete user: ' +employee.name);
    
            confirmBox.setButtonLabels('YES', 'NO');
    
    
    
           // Choose layout color type
           confirmBox.setConfig({
            layoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER | WARNING
            animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
            animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
            });
    
    
    
    
            // Simply open the popup and listen which button is clicked
    
            confirmBox.openConfirmBox$().subscribe(resp => {
    if(resp.success)
    {
        console.log("Emp",employee.id);
        this._employeeService.deleteEmployee(employee.id).subscribe(() => {
            this.notify.info(this.l('SuccessfullyDeleted'));
            _remove(this.employeeList, employee);
        });
    }
    else
    {
        console.log("Cancel");
    }
    });
    
                // do some action after user click on a button
   
    
        
    
        // this.message.confirm(
        //     this.l('AreYouSureToDeleteThePerson', employee.name),
        //     this.isConfirmed => {
        //         if (isConfirmed) {
        //             this._employeeService.deleteEmployee(employee.id).subscribe(() => {
        //                 this.notify.info(this.l('SuccessfullyDeleted'));
        //                 _remove(this.employeeList, employee);
        //             });
        //         }
        //     }
        // );
    }
}