import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Cooperative } from '../models/cooperative';

@Injectable({
    providedIn: 'root'
})
export class CooperativeService {
    private apiUrl = 'http://localhost:8080/api/cooperatives';

    selectedCooperative: Cooperative;

    // const headers = new HttpHeaders();
  
    // headers.delete('Content-Type');
 

    // return this.http.post<Project>(this.apiUrl+`/user/projects/create`, formData, { headers: headers });

    constructor(private http: HttpClient) { }

    getCooperatives(): Observable<Cooperative[]> {
      return this.http.get<any[]>(this.apiUrl).pipe(
        map((data) => {
          return data.map((cooperative) => ({
            id: cooperative.id,
            nom: cooperative.nom,
            description: cooperative.description,
            email: cooperative.email,
            localisation: cooperative.localisation,
            address: cooperative.address,
            telephone: cooperative.telephone,
            photo: this.convertBytesToFile(cooperative.photo),
            password: cooperative.password,
            estValide: cooperative.estValide,
            admin: cooperative.admin
          })) as Cooperative[];
        })
      );
    }
    

    saveCooperative(formData:FormData): Observable<any> {
        const headers = new HttpHeaders();
  
        headers.delete('Content-Type');
     
    
        return this.http.post<any>(`${this.apiUrl}`, formData,{headers: headers});
    }
    

    getCooperativeDetails(cooperativeId: number): Observable<Cooperative> {
        const url = `${this.apiUrl}/${cooperativeId}`;
    
        return this.http.get<any>(url).pipe(
          map((cooperative) => ({
            id: cooperative.id,
            nom: cooperative.nom,
            description: cooperative.description,
            email: cooperative.email,
            localisation: cooperative.localisation,
            address: cooperative.address,
            telephone: cooperative.telephone,
            photo: this.convertBytesToFile(cooperative.photo),
            password: cooperative.password,
            estValide: cooperative.estValide,
            admin: cooperative.admin
          }))
        );
      }

    updateCooperative(cooperativeId: number, cooperative: any): Observable<any> {
        const url = `${this.apiUrl}/${cooperativeId}`;
        return this.http.put(url, cooperative);
    }
    deleteCooperative(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
      }

      getCooperativeDetailsByEmail(cooperativeEmail: string): Observable<Cooperative> {
        const url = `${this.apiUrl}`+`/email`;

        let params = new HttpParams();
        params = params.set('cooperativeEmail',cooperativeEmail);
    
        return this.http.get<any>(url,{params:params}).pipe(
          map((cooperative) => ({
            id: cooperative.id,
            nom: cooperative.nom,
            description: cooperative.description,
            email: cooperative.email,
            localisation: cooperative.localisation,
            address: cooperative.address,
            telephone: cooperative.telephone,
            photo: this.convertBytesToFile(cooperative.photo),
            password: cooperative.password,
            estValide: cooperative.estValide,
            admin: cooperative.admin
          }))
        );
      }

      private convertBytesToFile(base64String: string, fileName = 'image.jpg', fileType = 'image/jpeg'): File {
        const uint8Array = this.convertBase64ToUint8Array(base64String);
        const blob = new Blob([uint8Array], { type: fileType });
        return new File([blob], fileName, { type: fileType });
      }
    
      private convertBase64ToUint8Array(base64String: string): Uint8Array {
        const binaryString = window.atob(base64String);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; ++i) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
      }

   
}

