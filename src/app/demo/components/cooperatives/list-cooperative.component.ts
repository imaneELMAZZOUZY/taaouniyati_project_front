
import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Produit } from 'src/app/demo/models/produit';
import { ProductService } from 'src/app/demo/service/product.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CategoryService } from 'src/app/demo/service/category.service';
import { CooperativeService } from 'src/app/demo/service/cooperative.service';
import { UserService } from 'src/app/demo/service/user.service';
import { Router } from '@angular/router';
import { Cooperative } from '../../models/cooperative';


@Component({
    templateUrl: './list-cooperative.component.html',
    styleUrls: ['./list-cooperative.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('void', style({
                opacity: 0
            })),
            transition('void <=> *', animate(400)),
        ]),
    ],
    providers: [MessageService]
})
export class ListCooperativeComponent implements OnInit {


    cooperatives: Cooperative[] = null;

   

    constructor(private productService: ProductService,
        private cooperativeService: CooperativeService,
        private userService: UserService,
        private router:Router
        ) { }

    ngOnInit() {

        this.loadCooperatives();   

        
    }

   

    loadCooperatives() {
        this.cooperativeService.getCooperatives().subscribe(cooperatives => {
            this.cooperatives = cooperatives;
            console.log(this.cooperatives);
        });
    }
 
      
    redirectToCooperativeDetails(selectedCooperative:Cooperative)
    {
        this.cooperativeService.selectedCooperative=selectedCooperative;
        console.log(this.cooperativeService.selectedCooperative);
        this.router.navigateByUrl("/cooperative-details");
            
    }

   

    getLogoURL(logoFile: File | null): string {
        if (logoFile) {
            return URL.createObjectURL(logoFile);
        } 
        return '';
    }        

  
    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }

    
}


