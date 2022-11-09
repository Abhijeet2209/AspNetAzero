import {NgModule} from '@angular/core';
import {AppSharedModule} from '@app/shared/app-shared.module';
import {EasyLabRoutingModule} from './easylab-routing.module';
import {EasyLabComponent} from './easylab.component';
import {CreateEmployeeModalComponent} from './create-employee-model.component';

@NgModule({
    declarations: [EasyLabComponent , CreateEmployeeModalComponent],
    imports: [AppSharedModule, EasyLabRoutingModule]
})
export class EasyLabModule {}