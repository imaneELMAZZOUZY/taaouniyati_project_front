import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProduitDetailsComponent } from './produit-details.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ProduitDetailsComponent }
    ])],
    exports: [RouterModule]
})
export class ProduitDetailsRoutingModule { }
