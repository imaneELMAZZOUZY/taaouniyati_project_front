import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/demo/models/produit';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { Cooperative } from 'src/app/demo/models/cooperative';
import { CooperativeService } from 'src/app/demo/service/cooperative.service';
import { UserService } from 'src/app/demo/service/user.service';
import { Categorie } from 'src/app/demo/models/categorie';
import { CategoryService } from 'src/app/demo/service/category.service';

@Component({
    templateUrl: './validateproduit.component.html',
    providers: [MessageService]
})
export class ValidateProduitComponent implements OnInit {

    valideProductDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Produit[] = [];

    product: Produit = {};

    selectedProducts: Produit[] = [];
    categoriesList: Categorie[] = [];


    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];
    cooperatives: Cooperative[] = [];
    selectedCooperativeId: number | null = null;

    constructor(private productService: ProductService, private messageService: MessageService,
        private cooperativeService : CooperativeService,
        private categorieService : CategoryService,
        private userService : UserService) { }

    ngOnInit() {
        this.productService.getProduitsNonValides().subscribe(data => {
            this.products = data;
            console.log("products", this.products);  // Déplacez le log ici
          });

          this.categorieService.getCategories().subscribe(data => {
            this.categoriesList = data;
            console.log("categories", this.categoriesList);  // Déplacez le log ici
          });
        
          this.cooperativeService.getCooperatives().subscribe(data => {
            this.cooperatives = [{ id: -1, nom: 'Toutes les coopératives' }, ...data]
            console.log("cooperatives", this.cooperatives);  // Déplacez le log ici
          });
      
        this.cols = [
          { field: 'product', header: 'Product' },
          { field: 'price', header: 'Price' },
          { field: 'poids', header: 'Poids' },
          { field: 'category', header: 'Category' },
          { field: 'description', header: 'Description' },
          { field: 'inventoryStatus', header: 'Status' }
        ];
      
        this.statuses = [
          { label: 'INSTOCK', value: 'instock' },
          { label: 'LOWSTOCK', value: 'lowstock' },
          { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
      }
      handleCooperativeChange() {
        if (this.selectedCooperativeId !== -1) {
            this.productService.getProduitsByCooperativeId(this.selectedCooperativeId)
                .subscribe((products) => {
                    console.log("Filtered Products:", products);
                    this.products = products;
                });
        } else if (this.selectedCooperativeId === -1) {
            // Si "Toutes les coopératives" sont sélectionnées, afficher tous les produits
            this.productService.getProduitsNonValides().subscribe(data => {
                this.products = data;
                console.log("All Products:", this.products);
            });
        }
    }
    
    getCategoryName(categoryId: number): string {
      const categorie = this.categoriesList.find(cat => cat.id === categoryId);
      return categorie ? categorie.nom : 'N/A';  // Affiche 'N/A' si la catégorie n'est pas trouvée
    }
    
      

    openNew() {
        this.product = {};
        this.submitted = false;
        this.valideProductDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    valideProduct(product: Produit) {
        this.product = { ...product };
        this.valideProductDialog = true;
    }

    deleteProduct(product: Produit) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }
      

    confirmDeleteSelected() {
      this.deleteProductsDialog = false;
    
      // Parcours des produits sélectionnés et suppression un par un
      for (const selectedProduct of this.selectedProducts) {
        this.productService.deleteProduct(selectedProduct.id).subscribe(
          () => {
            // Suppression réussie, effectuez des actions supplémentaires si nécessaire
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            this.products = this.products.filter(val => val.id !== selectedProduct.id);
          },
          (error) => {
            // Gestion des erreurs lors de la suppression
            console.error('Error deleting product:', error);
            // Vous pouvez afficher un message d'erreur à l'utilisateur si nécessaire
          }
        );
      }
    
      // Effacer la liste des produits sélectionnés après la suppression
      this.selectedProducts = [];
    }
    

    confirmDelete(product: Produit) {
        this.deleteProductDialog = false;
        this.productService.deleteProduct(product.id).subscribe(
            () => {
              // Suppression réussie, effectuez des actions supplémentaires si nécessaire
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
              this.products = this.products.filter(val => val.id !== product.id);
            },
            (error) => {
              // Gestion des erreurs lors de la suppression
              console.error('Error deleting product:', error);
              // Vous pouvez afficher un message d'erreur à l'utilisateur si nécessaire
            }
          );
    }

    confirmValider(product: Produit) {
        this.valideProductDialog = false;
        this.productService.validerProduct(product.id, this.userService.authenticatedUser.username).subscribe(
            () => {
              // Suppression réussie, effectuez des actions supplémentaires si nécessaire
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Produit validé avec succès', life: 3000 });
              this.products = this.products.filter(val => val.id !== product.id);
            },
            (error) => {
              // Gestion des erreurs lors de la suppression
              console.error('Error validating product:', error);
              // Vous pouvez afficher un message d'erreur à l'utilisateur si nécessaire
            }
          );
    }

    hideDialog() {
        this.valideProductDialog = false;
        this.submitted = false;
    }
}
