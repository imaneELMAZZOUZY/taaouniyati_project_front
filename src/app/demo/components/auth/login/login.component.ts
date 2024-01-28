import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/demo/service/user.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit{

    email!: string;
    password!: string;

 //   loginForm: FormGroup;
    

    constructor(public layoutService: LayoutService,
     //   private formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router
        ) { }


    ngOnInit() {
     

          
    }


    login() {
      
    this.userService.login(this.email, this.password).subscribe({
        next: (user) => {
            user = user;
            this.userService.authenticatedUser = user;
            this.userService.setThisUserToLocalStorage();
            console.log(this.userService.authenticatedUser);
            if(this.userService.authenticatedUser.roles[0]=="ROLE_Client"){
            this.router.navigateByUrl("/products/catalogue");
            
            }
            else if(this.userService.authenticatedUser.roles[0]=="ROLE_Cooperative"){
            this.router.navigateByUrl("/cooperative/dashboard"); 
            }
            else if(this.userService.authenticatedUser.roles[0]=="ROLE_Admin"){
                this.router.navigateByUrl("/admin/dashboard");
            
            }
            else{
                this.router.navigateByUrl("/products/catalogue");
            }
        },
        error: (err) => {
            console.log(err);
        },
        });
    }
    
}
        
      



