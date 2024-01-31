import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/demo/models/client';
import { Cooperative } from 'src/app/demo/models/cooperative';
import { CooperativeService } from 'src/app/demo/service/cooperative.service';
import { UserService } from 'src/app/demo/service/user.service';
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
    description!: string; 
    address!: string; 
    photo!: File; 
    localisation!: string;

    regions: string[] = [
        "Tanger-Tétouan-Al Hoceïma",
        "L'Oriental",
        "Fès-Meknès",
        "Rabat-Salé-Kénitra",
        "Béni Mellal-Khénifra",
        "Casablanca-Settat",
        "Marrakech-Safi",
        "Drâa-Tafilalet",
        "Souss-Massa",
        "Guelmim-Oued Noun",
        "Laâyoune-Sakia El Hamra",
        "Dakhla-Oued Ed-Dahab"
    ];

      client:Client;
      cooperative:Cooperative;
    

    constructor(public layoutService: LayoutService,public router:Router,
        public cooperativeService: CooperativeService,
        public userService: UserService
        ) { }


    ngOnInit() {

        this.client={
 
            password :"",
            email:"",
            nom:"",
            prenom:"",
            telephone:"",
 
          }

    
          
    }

    onPhotoSelected(event: Event) : void {
        const inputElement = event.target as HTMLInputElement;
        if (inputElement.files && inputElement.files.length > 0) {
          this.photo = inputElement.files[0];
          console.log(this.photo);
        }
        }
        

    register(){

     
        if(this.choix == 'client'){
            this.registerClient();
        }else if(this.choix == 'cooperative'){  
            this.registerCooperative();
        }
        
      }

    registerClient(){
        this.client.nom = this.nom;
        this.client.prenom = this.prenom;
        this.client.telephone = this.tel;
        this.client.email = this.email;
        this.client.password = this.password;
        this.userService.saveClient(this.client).subscribe(res => {
                console.log(res);
                this.router.navigate(['/auth/login']);
        });
    }

      registerCooperative(){
        const formData = new FormData();
        formData.append('nom', this.nom);
        formData.append('telephone', this.tel);
        formData.append('email', this.email);
        formData.append('password', this.password);
        formData.append('description', this.description);
        formData.append('address', this.address);
        formData.append('localisation', this.localisation);
        if (this.photo) {
            console.log(this.photo);
            const blob = new Blob([this.photo], { type: 'image/jpeg' });
            console.log(blob);
            formData.append('cooperativephoto', blob, 'cooperative_logo.jpg');
            
          }

          
        this.cooperativeService.saveCooperative(formData).subscribe(res => {
            console.log(res);
            this.router.navigate(['/auth/login']);
        });
      }
    
    choisirClient() {
        this.choix = 'client';
    }
    
    choisirCooperative() {
        this.choix = 'cooperative';
    }
}


