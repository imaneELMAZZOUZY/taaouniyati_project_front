import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Produit } from 'src/app/demo/models/produit';
import { ProductService } from 'src/app/demo/service/product.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CategoryService } from 'src/app/demo/service/category.service';
import { CooperativeService } from 'src/app/demo/service/cooperative.service';
import { Cooperative } from '../../models/cooperative';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
    selector: 'app-produit-details',
    templateUrl: './produit-details.component.html',
    styleUrls: ['./produit-details.component.scss'] ,
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
export class ProduitDetailsComponent implements OnInit {

    cooperative: Cooperative;
  //  cooperativeId:number = 3; 
    photoUrl: File;
  
    categorieId :number = 0;

    produit: Produit;

    constructor(private productService: ProductService,
        private cooperativeService: CooperativeService,
        private userService: UserService,
        private service: MessageService,

        ) { }

    ngOnInit() {

      this.produit = this.productService.selectedProduit;

      console.log(this.produit);

      this.cooperativeService.getCooperativeDetails(this.produit.cooperative.id).subscribe({
        next: (data: Cooperative) => {
          this.cooperative = data;
          console.log(this.cooperative);
        },
        error: (error: any) => {
          console.error('Une erreur est survenue : ', error);
        }
      });
      //  this.getProduitDetails(productId);
    }
    // getProduitDetails(productId: number): void {
    //   this.productService.getProduitById(productId).subscribe((produit: Produit) => {
    //     // Maintenant, vous pouvez utiliser le produit ici
    //     this.produit = produit;
    //     console.log(this.produit);
    //   });
    // }
    
  
     
    
      getLogoURL(logoFile: File | null): string {
        if (logoFile) {
          return URL.createObjectURL(logoFile);
        } 
        return '';
      }

      markProductAsInteresting(productId:number) {

        if (this.userService.authenticatedUser === null) {
            this.service.add({ key: 'tst', severity: 'error', summary: "Pour pouvoir indiquer qu'un produit vous intéresse, veuillez vous connecter !"});

        } else {
        const clientEmail = JSON.parse(localStorage.getItem('authUser')).username;
        
        this.productService.sendProductInterest(productId, clientEmail).subscribe(() => {
            this.service.add({ key: 'tst', severity: 'success', summary: 'Le produit est marqué comme intéressant', detail: 'Merci pour votre intérêt, la coopérative va vous contacter prochainement' });
        });
         }
    }

    }