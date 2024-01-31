import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CooperativeProfilRoutingModule } from './cooperative-profil-routing.module';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { CooperativeProfilComponent } from './cooperative-profil.component';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CheckboxModule } from 'primeng/checkbox';
import { ImageModule } from 'primeng/image';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		CooperativeProfilRoutingModule,
		DataViewModule,
		PickListModule,
		OrderListModule,
		InputTextModule,
		DropdownModule,
		RatingModule,
		ButtonModule,
		DialogModule,
		 TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
		CheckboxModule,
		ImageModule
	],
	declarations: [CooperativeProfilComponent]
})
export class CooperativeProfilModule { }
