import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Produit } from '../api/produit';
import { Product } from '../api/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/produits'; 

  constructor(private http: HttpClient) { }

  // getProduitsWithFilter(cooperativeId: number | null, categorieId: number | null, currentPage: number, pageSize: number): Observable<Produit[]> {
  //   let url = `${this.apiUrl}`;

  //   const headers = new HttpHeaders();
  
  //   headers.delete('Content-Type');
 

  //   if (cooperativeId) {
  //     url += `&cooperativeId=${cooperativeId}`;
  //   }

  //   if (categorieId) {
  //     url += `&categorieId=${categorieId}`;
  //   }

  //   return this.http.get(url,{
  //     headers: headers,
  //   }).pipe(
  //     map((data:any) => {
  //       console.log(data);
  //       return data.content.map((produit: any) => {
  //         console.log(produit);
  //         return {
  //           id: produit.id, 
  //           nom: produit.nom,
  //           description: produit.description,
  //           prix: produit.prix,
  //           photo: this.convertBytesToFile(produit.photo),
  //           poids: produit.poids,
  //           estValide: produit.estValide,
  //           inStock: produit.inStock,
  //           categorie: { id: produit.categorie },
  //           cooperative: { id: produit.cooperative },
  //           admin: { id: produit.admin }
  //         };
  //       });
  //     })
  //   );
  // }


  getProduitsWithFilter(cooperativeId: number | null, categorieId: number | null, currentPage: number, pageSize: number): Observable<Produit[]> {
    let params = new HttpParams();

    if (cooperativeId) {
      params = params.set('cooperativeId', cooperativeId.toString());
    }

    if (categorieId) {
      params = params.set('categorieId', categorieId.toString());
    }

  // return this.http.get<Produit[]>(this.apiUrl, { params })
      // .pipe(
      //   map((data: any) => {
      //     console.log(data);
      //     return data.content.map((produit: any) => ({
      //       id: produit.id,
      //       nom: produit.nom,
      //       description: produit.description,
      //       prix: produit.prix,
      //       photo: this.convertBytesToFile(produit.photo),
      //       poids: produit.poids,
      //       estValide: produit.estValide,
      //       inStock: produit.inStock,
      //       categorie: { id: produit.categorie },
      //       cooperative: { id: produit.cooperative },
      //       admin: { id: produit.admin }
      //     }));
      //   })
      // );

      return this.http.get<any[]>(this.apiUrl,{params}).pipe(

        map((data) => {
        
          const produits: Produit[] = data.map((produit) => ({
            id: produit.id,
            nom: produit.nom,
            description: produit.description,
            prix: produit.prix,
            photo: this.convertBytesToFile(produit.photo),
            poids: produit.poids,
            estValide: produit.estValide,
            inStock: produit.inStock,
            categorie: { id: produit.categorie },
            cooperative: { id: produit.cooperative },
            admin: { id: produit.admin }
          //  projectImages: this.convertBytesToFiles(project.projectImages), 
          }));
          return produits;
        })
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

  getProductsSmall() {
    return this.http.get<any>('assets/demo/data/products-small.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
}

getProducts() {
    return this.http.get<any>('assets/demo/data/products.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
}

getProductsMixed() {
    return this.http.get<any>('assets/demo/data/products-mixed.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
}

getProductsWithOrdersSmall() {
    return this.http.get<any>('assets/demo/data/products-orders-small.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
}
}