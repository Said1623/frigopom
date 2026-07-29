import { Client } from '../clients/client.entity';
import { Chambre } from '../chambres/chambre.entity';
export declare class UnitesFrigo {
    id: number;
    nom: string;
    adresse: string;
    description: string;
    nombre_chambres: number;
    actif: boolean;
    source_donnees: string;
    automate_url: string;
    client: Client;
    client_id: number;
    chambres: Chambre[];
    createdAt: Date;
}
