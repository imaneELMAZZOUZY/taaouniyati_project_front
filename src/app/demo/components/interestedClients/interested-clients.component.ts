import { Component, OnInit } from '@angular/core';
import { CooperativeService } from '../../service/cooperative.service';
import { Client } from '../../models/client';
import { Produit } from '../../models/produit';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { Cooperative } from '../../models/cooperative';
import { UserService } from 'src/app/demo/service/user.service';
import { Categorie } from 'src/app/demo/models/categorie';
import { CategoryService } from 'src/app/demo/service/category.service';

@Component({
  selector: 'app-interested-clients',
  templateUrl: './interested-clients.component.html',
  styleUrls: ['./interested-clients.component.scss'],
  providers: [MessageService]

  
})
export class InterestedClientsComponent implements OnInit {
  interestedClients: Client[] = [];
  errorMessage: string | null = null;
  produits: Produit[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;
  produitId: number = null;
  cooperativeId: string = null;
  filteredClients: Client[] = [];

  constructor(private cooperativeService: CooperativeService,
    private userService : UserService) { }

  ngOnInit(): void {
    // Utilisez le service pour récupérer la liste des clients intéressés
    this.userService.getClientsInterested(this.userService.authenticatedUser.username)
      .subscribe(
        (clients) => {
          console.log('Interested Clients:', clients);
          // Réussi, mettez à jour la liste des clients intéressés
          this.interestedClients = clients;
        },
        (error) => {
          // Gestion des erreurs
          console.error('Error fetching interested clients:', error);
          this.errorMessage = 'An error occurred while fetching interested clients.';
        }
      );

      }
   


 
}
