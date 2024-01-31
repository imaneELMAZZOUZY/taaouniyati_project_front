import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiUrl = 'http://localhost:8080/api/categories'; 

    // const headers = new HttpHeaders();
  
    // headers.delete('Content-Type');
 

    // return this.http.post<Project>(this.apiUrl+`/user/projects/create`, formData, { headers: headers });
    
    constructor(private http: HttpClient) { }

    getCategories(): Observable<any> {

        
    const headers = new HttpHeaders();
  
    headers.delete('Content-Type');
        return this.http.get<any>(this.apiUrl,{ headers: headers });
    }
}
