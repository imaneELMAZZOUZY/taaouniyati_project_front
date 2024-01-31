import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ProduitDetailsRoutingModule } from './produit-details-routing.module';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ProduitDetailsComponent } from './produit-details.component';
import { ImageModule } from 'primeng/image';
import { ToastModule } from 'primeng/toast';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ProduitDetailsRoutingModule,
		DataViewModule,
		PickListModule,
		OrderListModule,
		InputTextModule,
		DropdownModule,
		RatingModule,
		ButtonModule,
		ImageModule,
		ToastModule
	],
	declarations: [ProduitDetailsComponent]
})
export class ProduitDetailsModule { }
