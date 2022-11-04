import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EasyLabComponent} from './easylab.component';

const routes: Routes = [{
    path: '',
    component: EasyLabComponent,
    pathMatch: 'full'
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EasyLabRoutingModule {}