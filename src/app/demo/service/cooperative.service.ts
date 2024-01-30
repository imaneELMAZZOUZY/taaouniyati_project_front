import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CooperativeService {
    private apiUrl = 'http://localhost:8080/api/cooperatives';

    // const headers = new HttpHeaders();
  
    // headers.delete('Content-Type');
 

    // return this.http.post<Project>(this.apiUrl+`/user/projects/create`, formData, { headers: headers });

    constructor(private http: HttpClient) { }

    getCooperatives(): Observable<any> {

        
    const headers = new HttpHeaders();
  
     headers.delete('Content-Type');
        return this.http.get<any>(this.apiUrl,{headers: headers});
    }


    saveCooperative(formData:FormData): Observable<any> {
        const headers = new HttpHeaders();
  
        headers.delete('Content-Type');
     
    
        return this.http.post<any>(`${this.apiUrl}`, formData,{headers: headers});
    }

    getInterestedClients(cooperativeId: string): Observable<any> {
        const url = `${this.apiUrl}/${cooperativeId}/clients-interested`;
    
        // Ajout du type de contenu JSON
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
        return this.http.get(url, { headers });
      }

      getConnectedCooperativeIdByEmail(cooperativeEmail: string): Observable<string> {
        const endpoint = '/connected-id-by-email';
        let params = new HttpParams();
        params = params.set('email', cooperativeEmail);  // Utilisez 'email' au lieu de 'cooperativeEmail'
    
        // Utilisez une requête HTTP GET pour obtenir l'ID de la coopérative par e-mail
        return this.http.get<string>(`${this.apiUrl}${endpoint}`, { params: params });
    }

    // getClientssWithFilter(cooperativeId: number | null, produitId: number | null, currentPage: number, pageSize: number): Observable<Client[]> {
    //     let params = new HttpParams();
    
    //     if (cooperativeId) {
    //       params = params.set('cooperativeId', cooperativeId.toString());
    //     }
    
    //     if (produitId) {
    //       params = params.set('produitId', produitId.toString());
    //     }
    
    //       return this.http.get<any[]>(this.apiUrl,{params}).pipe(
    
    //         map((data) => {
            
    //           const clients: Client[] = data.map((client) => ({
    //             id: client.id,
    //             nom: client.nom,
    //             prenom: client.description,
    //             email: client.email,
    //             telephone: client.telephone,
    //             password: client.password,
    //             produits: client.produits,
    //           }));
    //           return clients;
    //         })
    //       );
    //   }

    getProduitsCooperative(cooperativeId: string): Observable<any[]> {
        const url = `${this.apiUrl}/${cooperativeId}/produits`;
        // Ajout du type de contenu JSON
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<any[]>(url, { headers });
      }
      

    
    
    

   
}

