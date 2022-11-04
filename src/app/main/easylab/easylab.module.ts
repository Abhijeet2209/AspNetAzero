import {NgModule} from '@angular/core';
import {AppSharedModule} from '@app/shared/app-shared.module';
import {EasyLabRoutingModule} from './easylab-routing.module';
import {EasyLabComponent} from './easylab.component';

@NgModule({
    declarations: [EasyLabComponent],
    imports: [AppSharedModule, EasyLabRoutingModule]
})
export class EasyLabModule {}