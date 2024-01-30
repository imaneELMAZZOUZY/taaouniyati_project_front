import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Produit } from '../models/produit';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/produits';

  selectedProduit: Produit;

  constructor(private http: HttpClient) { }

  getAllProduits(): Observable<Produit[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<Produit[]>(url);
  }

  getProduitsNonValides(): Observable<Produit[]> {
    const url = `${this.apiUrl}/nonvalides`;
    return this.http.get<Produit[]>(url);
}


  getProduitsByCooperativeId(cooperativeId: number): Observable<Produit[]> {
    const url = `${this.apiUrl}/cooperative/${cooperativeId}`;
    return this.http.get<Produit[]>(url);
}


  // ...

deleteProduct(productId: number): Observable<void> {
  const url = `${this.apiUrl}/${productId}`;

  return this.http.delete<void>(url);
}

// validerProduct(productId: number): Observable<void> {
//   const url = `${this.apiUrl}/valider/${productId}`;
//   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

//   return this.http.put<void>(url, null, { headers: headers });
// }

validerProduct(productId: number, adminEmail: string): Observable<void> {

  let params = new HttpParams();
  params = params.set('productId',productId.toString());
  params = params.set('adminEmail',adminEmail);
  const url = `${this.apiUrl}/valider`;
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  // Vous pouvez ajuster le corps de la requête selon votre besoin

  return this.http.post<void>(url, { headers: headers },{params:params});
}



  getProduitsWithFilter(cooperativeId: number | null, categorieId: number | null): Observable<Produit[]> {
    let params = new HttpParams();

    if (cooperativeId) {
      params = params.set('cooperativeId', cooperativeId.toString());
    }

    if (categorieId) {
      params = params.set('categorieId', categorieId.toString());
    }

    return this.http.get<Produit[]>(this.apiUrl, { params })
      .pipe(
        map((data: any) => {
          return data.content.map((produit: any) => ({
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
          }));
        })
      );
  }

  sendProductInterest(productId: number, clientEmail: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('productId', productId.toString());
    params = params.set('clientEmail', clientEmail.toString());
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Boolean>(`${this.apiUrl}/interest`, {}, { headers: headers, params: params });
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

  getProduitById(produitId: number): Observable<Produit> {
    const url = `${this.apiUrl}/${produitId}`;
    return this.http.get<Produit>(url);
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
