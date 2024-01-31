import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListCooperativeComponent } from './list-cooperative.component';
@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ListCooperativeComponent }
	])],
	exports: [RouterModule]
})
export class ListCooperativeRoutingModule { }
