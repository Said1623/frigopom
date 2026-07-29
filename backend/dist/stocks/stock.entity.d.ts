import { Chambre } from '../chambres/chambre.entity';
export declare class Stock {
    id: number;
    chambre: Chambre;
    chambre_id: number;
    client_nom: string;
    variete: string;
    nb_palettes: number;
    poids_tonnes: number;
    date_entree: Date;
    date_sortie_prevue: Date;
    date_sortie_reelle: Date;
    statut: string;
    notes: string;
    createdAt: Date;
}
