import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CooperativeDetailsComponent } from './cooperative-details.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CooperativeDetailsComponent }
    ])],
    exports: [RouterModule]
})
export class CooperativeDetailsRoutingModule { }
