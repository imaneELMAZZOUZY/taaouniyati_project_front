import {  Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
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
    templateUrl: './cooperative-profil.component.html',
    styleUrls: ['./cooperative-profil.component.scss'] ,
    animations: [
        trigger('fadeInOut', [
            state('void', style({
                opacity: 0
            })),
            transition('void <=> *', animate(400)),
        ]),
    ]
})
export class CooperativeProfilComponent implements OnInit {

    cooperative: Cooperative;
    products: Produit[] = [];
    categories: any[] = [];
    categoriesDB: any[] = [];
    cooperatives: any[] = [];

    currentPage: number = 1;
    pageSize: number = 10;
    totalRecords: number = 0;

    cooperativeId:number = 13; 
    photoUrl: File;
    showAboutSection: boolean = true;
    showProductsSection: boolean = false;
    showClientsSection: boolean = false;
    categorieId :number = 0;
    productDialog: boolean = false;
    product: Produit = {};
    selectedFile: File | null = null;
    submitted: boolean = false;
    constructor(private productService: ProductService,
        private categoryService: CategoryService,
        private cooperativeService: CooperativeService,
        private userService:UserService,
        private router: Router,
        ) { }

    ngOnInit() {
        this.categoryService.getCategories().subscribe(categories => {
            this.categories = categories;
            this.categories.unshift({ id: null, nom: 'Toutes les catégories' }); 
           
        });      
        this.cooperativeService.getCooperativeDetailsByEmail(this.userService.authenticatedUser.username).subscribe(data => {
              this.cooperative = data;
              this.loadCategories();
              this.loadProducts();
            },
            (error) => {
              console.error('Une erreur est survenue : ', error);
            }
          );
    
       
    }

    onPhotoSelected(event: Event) : void {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        this.photoUrl = inputElement.files[0];
        console.log(this.photoUrl);
      }
      }
    openNew() {
      console.log('i am here ');
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
     
  }
  hideDialog() {
    console.log(this.product);
    this.productDialog = false;
    this.submitted = false;
}
saveProduct() {

 this.product.cooperative=this.cooperative;
  this.productService.saveProduct(this.product).subscribe(
    
      response => {
          console.log('Produit sauvegardé avec succès !', response);
          this.loadProducts();
          this.hideDialog(); // Fermez le dialogue après avoir sauvegardé le produit avec succès
      },
      error => {
          console.error('Erreur lors de la sauvegarde du produit : ', error);
          // Gérez l'erreur ici, affichez un message à l'utilisateur ou effectuez d'autres actions si nécessaire
      }
  );
}
onFileSelected(event: any) {
  if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0]; // Stocke le premier fichier sélectionné
  }
}
    loadProducts()
    {
      
        this.productService.getProduitsWithFilter(this.cooperativeId,this.categorieId).subscribe(data => {
            this.products = data;
           console.log(this.products);
        }); 

    }
loadCategories(){
  this.categoryService.getCategories().subscribe(data => {
    this.categoriesDB = data;
  
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
          this.showClientsSection = false;
        } else if (section === 'products') {
          this.showAboutSection = false;
          this.showProductsSection = true;
          this.showClientsSection = false;
        } else if (section=== 'Clients potentiels'){
          this.showAboutSection = false;
          this.showProductsSection = false;
          this.showClientsSection = true;

        }
      }
      getCategoryName(categoryId: number): string {
        const category = this.categories.find(cat => cat.id === categoryId);
        return category ? category.nom : '';
    }
    
      getLogoURL(logoFile: File | null): string {
        if (logoFile) {
          return URL.createObjectURL(logoFile);
        } 
        return '';
      }
     
    
      redirectToProductDetail(selectedProduit: Produit) {
        console.log("Dialog opened"); // Log de débogage
        this.productService.selectedProduit = selectedProduit;
        console.log(this.productService.selectedProduit);
        this.router.navigateByUrl('/produit-details');

    }
    }