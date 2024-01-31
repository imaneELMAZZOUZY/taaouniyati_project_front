import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CooperativeProfilComponent } from './cooperative-profil.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CooperativeProfilComponent }
    ])],
    exports: [RouterModule]
})
export class CooperativeProfilRoutingModule { }
