import { Chambre } from '../chambres/chambre.entity';
export declare class Mesure {
    id: number;
    chambre: Chambre;
    chambre_id: number;
    temperature: number;
    humidite: number;
    co2: number;
    o2: number;
    ethylene: number;
    source: string;
    operateur: string;
    notes: string;
    horodatage: Date;
}
