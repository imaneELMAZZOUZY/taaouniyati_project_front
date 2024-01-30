import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CooperativeDetailsRoutingModule } from './cooperative-details-routing.module';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { CooperativeDetailsComponent } from './cooperative-details.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		CooperativeDetailsRoutingModule,
		DataViewModule,
		PickListModule,
		OrderListModule,
		InputTextModule,
		DropdownModule,
		RatingModule,
		ButtonModule
	],
	declarations: [CooperativeDetailsComponent]
})
export class CooperativeDetailsModule { }
