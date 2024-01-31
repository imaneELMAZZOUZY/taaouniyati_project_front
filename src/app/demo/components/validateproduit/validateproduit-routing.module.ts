import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ValidateProduitComponent } from './validateproduit.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ValidateProduitComponent }
    ])],
    exports: [RouterModule]
})
export class ValidateProduitRoutingModule { }
