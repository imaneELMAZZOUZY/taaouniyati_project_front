
import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Produit } from 'src/app/demo/models/produit';
import { ProductService } from 'src/app/demo/service/product.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CategoryService } from 'src/app/demo/service/category.service';
import { CooperativeService } from 'src/app/demo/service/cooperative.service';
import { Table } from 'primeng/table';
import { Cooperative } from '../../models/cooperative';
import { co } from '@fullcalendar/core/internal-common';
import { Router } from '@angular/router';

@Component({
    templateUrl: './espace-admin.component.html',
    styleUrls: ['./espace-admin.component.scss'],
    providers: [MessageService]
})
export class EspaceAdminComponent implements OnInit {

    selectedSection: string = '';

    

        productDialog: boolean = false;

        deleteProductDialog: boolean = false;
    
        deleteProductsDialog: boolean = false;
    
        products: Produit[] = [];
    
        cooperative: Cooperative = {};
    
        selectedCooperatives: Cooperative[] = [];
    
        selectedFile: File | null = null;
    
        submitted: boolean = false;
    
        cols: any[] = [];
    
        statuses: any[] = [];

        cooperatives: any;
        validationOptions: any[];
        selectedValidationOption: any;
        rowsPerPageOptions = [5, 10, 20];
        constructor(private productService: ProductService,
            private categoryService: CategoryService,
            private cooperativeService: CooperativeService,
            private messageService: MessageService,
            private router:Router
            ) { }
       
    
        ngOnInit() {
            this.loadCooperatives();
            this.cols = [
                { field: 'Nom', header: 'Nom' },
                { field: 'Telephone', header: 'Téléphone' },
                { field: 'Email', header: 'Email' },
                { field: 'Adresse', header: 'Adresse' },
                { field: 'Localisation', header: 'Localisation' },
                { field: 'Statut', header: 'Statut' }
            ];
    
           
            this.validationOptions = [
                { label: 'Coopératives validées', value: true }, // Option pour afficher les coopératives validées
                { label: 'Coopératives non validées', value: false } // Option pour afficher les coopératives non validées
            ];
        }
        loadCooperatives() {
            this.cooperativeService.getCooperatives().subscribe(
              (data: Cooperative[]) => {
                this.cooperatives=this.separerCooperatives(data);
              },
              (error) => {
                console.log('Erreur lors du chargement des coopératives : ', error);
              }
            );
          }
        onValidationFilterChange(event) {
            // Réagir au changement de sélection
            console.log('Nouvelle sélection:', event.value);
            console.log(this.selectedValidationOption);

            // Vous pouvez ici déclencher le filtrage des coopératives en fonction de la sélection
        }
       separerCooperatives(cooperatives: Cooperative[]): { valides: Cooperative[], nonValides: Cooperative[] } {
            const valides: Cooperative[] = [];
            const nonValides: Cooperative[] = [];
        
            cooperatives.forEach(cooperative => {
                if (cooperative.estValide) {
                    valides.push(cooperative);
                } else {
                    nonValides.push(cooperative);
                }
            });
        
            return { valides, nonValides };
        }
        validerCooperative(cooperative: any) {
            cooperative.estValide = true; 
            const formData = new FormData();
            formData.append('nom', cooperative.nom);
            formData.append('telephone', cooperative.telephone);
            formData.append('email', cooperative.email);
            formData.append('password', cooperative.password);
            formData.append('description', cooperative.description);
            formData.append('address', cooperative.address);
            formData.append('localisation', cooperative.localisation);
            formData.append('estValide', cooperative.estValide);
            if (cooperative.photo) {
                const blob = new Blob([cooperative.photo], { type: 'image/jpeg' });
                formData.append('cooperativephoto', blob, 'cooperative_logo.jpg');
            }
         // Mettez à jour l'attribut estValide de la coopérative
            this.cooperativeService.updateCooperative(cooperative.id, formData ).subscribe(
                () => {
              
                    console.log('La coopérative a été validée avec succès.');
                    this.loadCooperatives();
                },
                (error) => {
                    // Gérer les erreurs lors de la mise à jour de la coopérative
                    console.error('Erreur lors de la validation de la coopérative : ', error);
                }
            );
        }
     
    
        deleteSelectedCooperatives() {
            this.deleteProductsDialog = true;
        }
    
        deleteProduct(cooperative: Cooperative) {
            this.deleteProductDialog = true;
            this.cooperative = { ...cooperative};
        }
    
       
        confirmDeleteSelected() {
            this.deleteProductsDialog = false;
            for (const cooperative of this.selectedCooperatives) {
                this.cooperativeService.deleteCooperative(cooperative.id);
            }
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            this.selectedCooperatives = [];
        }
        confirmDelete() {
            this.deleteProductDialog = false;
            this.cooperativeService.deleteCooperative(this.cooperative.id);
            this.loadCooperatives();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            this.cooperative = {};
        }
    
        hideDialog() {
            this.productDialog = false;
            this.submitted = false;
        }
    
      
        onFileSelected(event: any) {
            if (event.target.files.length > 0) {
                this.selectedFile = event.target.files[0]; // Stocke le premier fichier sélectionné
            }
        }
    
        onGlobalFilter(table: Table, event: Event) {
            table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
        }
    selectSection(section: string) {
        this.selectedSection = section;

        if(section=='products')
        {
            this.router.navigateByUrl('/validateProduit');

        }
    }
    
}


