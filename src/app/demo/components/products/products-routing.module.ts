import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'catalogue', data: { breadcrumb: 'Catalogue' }, loadChildren: () => import('./catalogue/catalogue.module').then(m => m.CatalogueModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }
