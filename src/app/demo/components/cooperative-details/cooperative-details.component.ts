import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';

import { ProductService } from 'src/app/demo/service/product.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CategoryService } from 'src/app/demo/service/category.service';
import { CooperativeService } from 'src/app/demo/service/cooperative.service';

import { Router } from '@angular/router';
import { Cooperative } from '../../models/cooperative';
import { Produit } from '../../models/produit';
import { UserService } from '../../service/user.service';

@Component({
    selector: 'app-cooperative-details',
    templateUrl: './cooperative-details.component.html',
    styleUrls: ['./cooperative-details.component.scss'] ,
    animations: [
        trigger('fadeInOut', [
            state('void', style({
                opacity: 0
            })),
            transition('void <=> *', animate(400)),
        ]),
    ],

    providers:[MessageService]
})
export class CooperativeDetailsComponent implements OnInit {

    cooperative: Cooperative;
    products: Produit[] = [];
    categories: any[] = [];
    cooperatives: any[] = [];

    currentPage: number = 1;
    pageSize: number = 10;
    totalRecords: number = 0;

    photoUrl: File;
    showAboutSection: boolean = true;
    showProductsSection: boolean = false;
    categorieId :number = 0;


    constructor(private productService: ProductService,
        private categoryService: CategoryService,
        private cooperativeService: CooperativeService,
        private router: Router,

        private userService:UserService,
        private service:MessageService
        ) { }

    ngOnInit() {
        this.categoryService.getCategories().subscribe(categories => {
            this.categories = categories;
            this.categories.unshift({ id: null, nom: 'Toutes les catégories' }); 
           
        });   

      this.cooperative=this.cooperativeService.selectedCooperative;
           
       
      this.loadProducts();
       
    }

    loadProducts()
    {
        this.productService.getProduitsWithFilter(this.cooperative.id,this.categorieId).subscribe(data => {
            this.products = data;
        }); 

    }

      

    onPageChange(page: number) {
        this.currentPage = page;
        this.loadProducts();
      }
    
      onFilterChange(event: any) {
            if (event.value === null) {
              this.categorieId = 0; // Si Toutes les Catégories sont sélectionnées, catégorieId est défini sur 0
            } else {
              this.categorieId = event.value; // Sinon, la valeur sélectionnée est attribuée à categorieId
            }
          this.loadProducts();
        }

      toggleSection(section: string) {
        if (section === 'about') {
          this.showAboutSection = true;
          this.showProductsSection = false;
        } else if (section === 'products') {
          this.showAboutSection = false;
          this.showProductsSection = true;
        }
      }
      getLogoURL(logoFile: File | null): string {
        if (logoFile) {
          return URL.createObjectURL(logoFile);
        } 
        return '';
      }
      redirectToProductDetail(produit:Produit) {
        this.productService.selectedProduit=produit;
        this.router.navigateByUrl("/cooperative-details");
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