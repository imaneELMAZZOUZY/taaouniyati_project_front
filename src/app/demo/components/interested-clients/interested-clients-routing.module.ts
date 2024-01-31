import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InterestedClientsComponent } from './interested-clients.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: InterestedClientsComponent }
    ])],
    exports: [RouterModule]
})
export class InterestedClientsRoutingModule { }
