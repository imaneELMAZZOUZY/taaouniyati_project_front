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

  selectedProduit:Produit;

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


  getProduitsWithFilter(cooperativeId: number | null, categorieId: number | null): Observable<Produit[]> {
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
          }));
          return produits;
        })
      );
  }




  sendProductInterest(productId:number, clientEmail:number):Observable<any>
  {
    let params = new HttpParams();
    params = params.set('productId', productId.toString());
    params = params.set('clientEmail', clientEmail.toString());
    const headers = new HttpHeaders().set('Content-Type', 'application/json');   
    return this.http.post<Boolean>(this.apiUrl+`/interest`, { headers: headers },{params:params});
  }
 

  saveProduct(data: any): Observable<any> {
  
    const formData = new FormData();
    formData.append('nom', data.nom);
    formData.append('description', data.description);
    formData.append('prix', String(data.prix));
    formData.append('poids', String(data.poids));
    formData.append('estValide', String(false));
    formData.append('inStock', String(data.inStock));
    formData.append('categorie', String(data.categorie));
    formData.append('cooperative',String(data.cooperative.id));
  
    if (data.photo) {
      const blob = new Blob([data.photo], { type: 'image/jpeg' });
      formData.append('productphoto', blob, 'produit_photo.jpg');
    }
  
    console.log('i am save', formData);
  
    return this.http.post<Produit>(this.apiUrl, formData);
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


validerProduct(productId: number, adminEmail: string): Observable<void> {

  let params = new HttpParams();
  params = params.set('productId',productId.toString());
  params = params.set('adminEmail',adminEmail);
  const url = `${this.apiUrl}/valider`;
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  // Vous pouvez ajuster le corps de la requête selon votre besoin

  return this.http.post<void>(url, { headers: headers },{params:params});
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


  
    // getProduitsByCooperativeId(cooperativeId: number, categorieId: number): Observable<Produit[]> {
    //   const url = `${this.apiUrl}/cooperative/${cooperativeId}/categorie/${categorieId}`;
      
    //   return this.http.get<any[]>(url).pipe(
    //       map((data) => {
    //           const produits: Produit[] = data.map((produit) => ({
    //               id: produit.id,
    //               nom: produit.nom,
    //               description: produit.description,
    //               prix: produit.prix,
    //               photo: this.convertBytesToFile(produit.photo),
    //               poids: produit.poids,
    //               estValide: produit.estValide,
    //               inStock: produit.inStock,
    //               categorie: { id: produit.categorie },
    //               cooperative: { id: produit.cooperative },
    //               admin: { id: produit.admin }
    //           }));
    //           return produits;
    //       })
    //   );
    // }

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