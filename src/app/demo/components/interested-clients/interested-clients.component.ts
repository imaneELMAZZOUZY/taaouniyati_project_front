import { Component, OnInit } from '@angular/core';
import { CooperativeService } from '../../service/cooperative.service';
import { Client } from '../../models/client';
import { Produit } from '../../models/produit';

@Component({
  selector: 'app-interested-clients',
  templateUrl: './interested-clients.component.html',
  styleUrls: ['./interested-clients.component.scss']
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

  constructor(private cooperativeService: CooperativeService) { }

  ngOnInit(): void {
    // Obtenez l'e-mail du client connecté à partir du stockage local
    const cooperativeEmail = JSON.parse(localStorage.getItem('authUser')).username;

    // Utilisez le service CooperativeService pour obtenir l'ID de la coopérative connectée
    this.cooperativeService.getConnectedCooperativeIdByEmail(cooperativeEmail).subscribe(
      (cooperativeId: string) => {
        this.cooperativeId = cooperativeId;
        console.log('ID de la coopérative connectée : ', cooperativeId);
        this.cooperativeService.getProduitsCooperative(this.cooperativeId).subscribe(produits => {
          this.produits = produits;
          this.produits.unshift({ id: null, nom: 'Tous les produits' });
          console.log(this.produits);
          this.loadClients();
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'ID de la coopérative connectée : ', error);
      }
    );
  }

  loadClients() {
    // Utilisez l'ID de la coopérative pour récupérer les clients intéressés
    this.cooperativeService.getInterestedClients(this.cooperativeId).subscribe(
      (data: Client[]) => {
        console.log('Données récupérées avec succès : ', data);
        this.interestedClients = data;
        console.log('Données récupérées des clients intéressés : ', this.interestedClients);

        // Maintenant que vous avez les clients intéressés, filtrez-les en fonction du produit sélectionné
        this.filteredClients = this.filterClientsByProduit(this.interestedClients, this.produitId);
        console.log('Clients filtrés par produit : ', this.filteredClients);
      },
      (error) => {
        console.error('Erreur lors de la récupération des clients intéressés : ', error);

        if (error.status === 500) {
          this.errorMessage = 'Erreur interne du serveur. Veuillez réessayer plus tard.';
        } else {
          this.errorMessage = 'Une erreur inattendue s\'est produite.';
        }
      }
    );
  }

  filterClientsByProduit(clients: Client[], produitId: number): Client[] {
    if (produitId === null || produitId === undefined) {
      // Si aucun produit n'est sélectionné, retournez tous les clients
      return clients;
    } else {
      // Sinon, filtrez les clients en fonction de l'ID du produit
      return clients.filter(client => client.produits.some(produit => produit.id === produitId));
    }
  }
  
  

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadClients();
  }

  onProductChange(event: any) {
    this.produitId = event.value;
    this.loadClients();
  }
}
