import { Client } from '../clients/client.entity';
export declare enum UserRole {
    SUPER_ADMIN = "super_admin",
    ADMIN = "admin",
    OPERATEUR = "operateur",
    LECTEUR = "lecteur"
}
export declare class User {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    role: UserRole;
    actif: boolean;
    client: Client;
    client_id: number;
    createdAt: Date;
}
