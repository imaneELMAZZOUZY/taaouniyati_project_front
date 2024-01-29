import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Route, Router } from '@angular/router';
import { Client } from '../models/client';
import { Admin } from '../models/admin';


@Injectable({
  providedIn: "root"
})

export class UserService {



  private apiUrl = `http://localhost:8080/api`; 


  authenticatedUser: { username: string, lastname: string, firstname: string ,roles:string[]} | null = null;
  activationEmail?:string;

  constructor(private http: HttpClient, private router: Router
    ) {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      this.authenticatedUser = JSON.parse(storedUser);
    }  
  }

  login(email: string, password: string): Observable<{ username: string, lastname: string, firstname: string ,roles:string[]}> {
    const credentials = { username: email, password: password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<{ username: string, lastname: string, firstname: string, roles:string[] }>(this.apiUrl+`/auth`, credentials, { headers: headers });
  }

  // verifyActivationAccount(email:string):Observable<Boolean>
  // {

  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this.http.get<Boolean>(this.apiUrl+`/auth/activation?email=${email}`,{headers:headers});

  // }

  // activateAccount(email:string,password:string):Observable<Boolean>
  // {
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   const credentials = { username: email, password: password };
  //   return this.http.post<Boolean>(this.apiUrl+`/auth/activation`,credentials,{headers:headers});
  // }




  public setThisUserToLocalStorage(): Observable<boolean> {
    if (this.authenticatedUser) {
      localStorage.setItem("authUser", JSON.stringify({ username: this.authenticatedUser.username, lastname: this.authenticatedUser.lastname, firstname: this.authenticatedUser.firstname, roles:this.authenticatedUser.roles }));
    }
    return of(true);
  }



  // public hasRole(role: string): boolean {
  //   return this.authenticatedUser?.roles?.includes(role) || false;
  // }

  public isAuthenticated(): boolean {
    return this.authenticatedUser!=null;
  }

  public logout(): Observable<boolean> {
    
    this.authenticatedUser = null;
    localStorage.removeItem("authUser");
    this.router.navigateByUrl("/landing");
    return of(true);
  }




  saveClient(client:Client): Observable<any> {
      
      const headers = new HttpHeaders().set('Content-Type', 'application/json');   

      

      return this.http.post(this.apiUrl+`/clients`, client, { headers: headers });
  }

  


  


  // getAdminData(email: string) : Observable<Admin>
  // {
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this.http.get<Admin>(this.apiUrl+`/admin/infos?email=${email}`, { headers: headers });

  // }

  // updateAdminInfo(admin: Admin) : Observable<Admin>
  // {
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this.http.post<Admin>(this.apiUrl+`/admin/infos`,admin, { headers: headers });

  // }

  // getAllAdmins():Observable<Admin[]>
  // {
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this.http.get<Admin[]>(this.apiUrl+`/admin/list`,{ headers: headers });
    
  // }

  // saveAdmin(email:string):Observable<Admin>
  // {
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this.http.post<Admin>(this.apiUrl+`/admin/save?email=${email}`,{}, { headers: headers });

  // }

 

}
