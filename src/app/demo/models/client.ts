import { Produit } from "./produit";

export interface Client {
    id?: number;
    nom?: string;
    prenom?: string;
    email?: string;
    telephone?: string;
    password: string;
    produits?: Produit[];
}
