import { UnitesFrigo } from '../unites/unites.entity';
import { ConfigChambre } from './config-chambre.entity';
import { Mesure } from '../mesures/mesure.entity';
import { Alarme } from '../alarmes/alarme.entity';
import { Stock } from '../stocks/stock.entity';
export declare class Chambre {
    id: number;
    numero: number;
    nom: string;
    volume_m3: number;
    capacite_palettes: number;
    type_atmosphere: string;
    active: boolean;
    unite: UnitesFrigo;
    unite_id: number;
    config: ConfigChambre;
    mesures: Mesure[];
    alarmes: Alarme[];
    stocks: Stock[];
    createdAt: Date;
}
