import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { ListCooperativeComponent } from './list-cooperative.component';
import { ToastModule } from 'primeng/toast';
import { ListCooperativeRoutingModule } from './list-cooperative-routing.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ListCooperativeRoutingModule,
		DataViewModule,
		PickListModule,
		OrderListModule,
		InputTextModule,
		DropdownModule,
		RatingModule,
		ButtonModule,
		ToastModule
	],
	declarations: [ListCooperativeComponent]
})
export class ListCooperativeModule { }
