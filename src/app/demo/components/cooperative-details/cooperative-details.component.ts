import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';

import { ProductService } from 'src/app/demo/service/product.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CategoryService } from 'src/app/demo/service/category.service';
import { CooperativeService } from 'src/app/demo/service/cooperative.service';

import { Router } from '@angular/router';
import { Cooperative } from '../../models/cooperative';
import { Produit } from '../../models/produit';

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
    ]
})
export class CooperativeDetailsComponent implements OnInit {

    cooperative: Cooperative;
    products: Produit[] = [];
    categories: any[] = [];
    cooperatives: any[] = [];

    currentPage: number = 1;
    pageSize: number = 10;
    totalRecords: number = 0;

    cooperativeId:number = 3; 
    photoUrl: File;
    showAboutSection: boolean = true;
    showProductsSection: boolean = false;
    categorieId :number = 0;


    constructor(private productService: ProductService,
        private categoryService: CategoryService,
        private cooperativeService: CooperativeService,
        private router: Router
        ) { }

    ngOnInit() {
        this.categoryService.getCategories().subscribe(categories => {
            this.categories = categories;
            this.categories.unshift({ id: null, nom: 'Toutes les catégories' }); 
           
        });      
        this.cooperativeService.getCooperativeDetails(this.cooperativeId).subscribe(data => {
              this.cooperative = data;
              
            },
            (error) => {
              console.error('Une erreur est survenue : ', error);
            }
          );
      
          this.loadProducts();
       
    }

    loadProducts()
    {
        this.productService.getProduitsWithFilter(this.cooperativeId,this.categorieId).subscribe(data => {
            this.products = data;
          
        }); 

    }

    // loadProductsLazy(event: any) {
    //     this.currentPage = event.first / event.rows + 1;
    //     this.pageSize = event.rows;
    //     this.loadProducts();
    //   }
      

    onPageChange(page: number) {
        this.currentPage = page;
        this.loadProducts();
      }
    
      onFilterChange(event: any, filter: string) {
        if (filter === 'categorie') {
            if (event.value === null) {
              this.categorieId = 0; // Si Toutes les Catégories sont sélectionnées, catégorieId est défini sur 0
            } else {
              this.categorieId = event.value; // Sinon, la valeur sélectionnée est attribuée à categorieId
            }
          }  else if (filter === 'cooperative') {
          this.cooperativeId = event.value;
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
      redirectToProductDetail(productId: number) {
        this.router.navigate(['produit-details/produit-details', productId]);
    }
    

    }