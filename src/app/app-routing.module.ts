import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                 //   { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'products', loadChildren: () => import('./demo/components/products/products.module').then(m => m.ProductsModule) },
                    { path: 'cooperative-details', loadChildren: () => import('./demo/components/cooperative-details/cooperative-details.module').then(m => m.CooperativeDetailsModule) },
                    { path: 'produit-details', loadChildren: () => import('./demo/components/produit-details/produit-details.module').then(m => m.ProduitDetailsModule) },
                    { path: 'list-cooperatives', loadChildren: () => import('./demo/components/cooperatives/list-cooperative.module').then(m => m.ListCooperativeModule) },
                    { path: 'interested-clients', loadChildren: () => import('./demo/components/interestedClients/interested-clients.module').then(m => m.InterestedClientsModule) },
                    { path: 'profil-cooperative', loadChildren: () => import('./demo/components/cooperative-profil/cooperative-profil.module').then(m => m.CooperativeProfilModule) },
                    { path: 'espace-admin', loadChildren: () => import('./demo/components/espace-admin/espace-admin.module').then(m => m.EspaceAdminModule) },
                    { path: 'validateProduit', loadChildren: () => import('./demo/components/validateproduit/validateproduit.module').then(m => m.ValidateProduitModule) },


                    
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            
            { path: 'notfound', component: NotfoundComponent },
            { path: 'ui', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
           
            
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
