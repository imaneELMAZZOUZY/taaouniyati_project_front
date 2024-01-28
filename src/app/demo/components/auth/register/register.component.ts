import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class RegisterComponent implements OnInit {

    email!: string;
    password!: string;
    choix: string = null;
    nom!: string;
    prenom!: string;
    tel!: string;
    description!: string; // Ajouté
    address!: string; // Ajouté
    photo!: File; // Ajouté
    

    constructor(public layoutService: LayoutService,public router:Router) { }


    ngOnInit() {
     

          
    }
    
    choisirClient() {
        this.choix = 'client';
    }
    
    choisirCooperative() {
        this.choix = 'cooperative';
    }
}


