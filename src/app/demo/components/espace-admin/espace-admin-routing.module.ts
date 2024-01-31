import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {  EspaceAdminComponent } from './espace-admin.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EspaceAdminComponent }
	])],
	exports: [RouterModule]
})
export class EspaceAdminRoutingModule { }
