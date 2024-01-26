import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CatalogueComponent } from './catalogue.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CatalogueComponent }
	])],
	exports: [RouterModule]
})
export class CatalogueRoutingModule { }
