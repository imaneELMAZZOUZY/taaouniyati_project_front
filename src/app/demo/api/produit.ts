import { Admin } from "./admin";
import { Categorie } from "./categorie";
import { Cooperative } from "./cooperative";

export interface Produit {
    id?: number;
    nom?: string;
    description?: string;
    prix?: number;
    photo?: File;
    poids?: string;
    estValide?: boolean;
    inStock?: boolean;
    categorie?: Categorie;
    cooperative?: Cooperative;
    admin?: Admin;
}
