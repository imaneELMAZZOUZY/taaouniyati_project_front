
import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Produit } from 'src/app/demo/models/produit';
import { ProductService } from 'src/app/demo/service/product.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CategoryService } from 'src/app/demo/service/category.service';
import { CooperativeService } from 'src/app/demo/service/cooperative.service';
import { UserService } from 'src/app/demo/service/user.service';


@Component({
    templateUrl: './catalogue.component.html',
    styleUrls: ['./catalogue.component.scss'],
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
export class CatalogueComponent implements OnInit {

    products: Produit[] = [];
    categories: any[] = [];
    cooperatives: any[] = [];

    currentPage: number = 1;
    pageSize: number = 10;
    totalRecords: number = 0;

    cooperativeId:number = null; 
    categorieId :number = null;


    constructor(private productService: ProductService,
        private categoryService: CategoryService,
        private cooperativeService: CooperativeService,
        private service: MessageService,
        private userService: UserService
        ) { }

    ngOnInit() {

        this.categoryService.getCategories().subscribe(categories => {
            this.categories = categories;
            this.categories.unshift({ id: null, nom: 'Toutes les catégories' }); 
            console.log(this.categories);
            this.cooperativeService.getCooperatives().subscribe(cooperatives => {
                this.cooperatives = cooperatives;
                this.cooperatives.unshift({ id: null, nom: 'Toutes les coopératives' }); 
                console.log(this.cooperatives);
                this.loadProducts();
            });
    
        });       
    }

    loadProducts()
    {
        this.productService.getProduitsWithFilter(this.cooperativeId, this.categorieId, this.currentPage, this.pageSize).subscribe(data => {
            this.products = data;
            console.log(this.products);
            this.products.forEach(produit => {
                produit.categorie = this.categories.find(categorie => categorie.id === produit.categorie.id);
                produit.cooperative = this.cooperatives.find(cooperative => cooperative.id === produit.cooperative.id);
            });
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
          this.categorieId = event.value;
        } else if (filter === 'cooperative') {
          this.cooperativeId = event.value;
        }
        this.loadProducts();
      }
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


