import { Chambre } from './chambre.entity';
export declare class ConfigChambre {
    id: number;
    chambre: Chambre;
    chambre_id: number;
    temp_consigne: number;
    temp_min: number;
    temp_max: number;
    hum_consigne: number;
    hum_min: number;
    hum_max: number;
    co2_consigne: number;
    co2_min: number;
    co2_max: number;
    o2_consigne: number;
    o2_min: number;
    o2_max: number;
    alarme_temp_haute: number;
    alarme_temp_basse: number;
    alarme_hum_basse: number;
    alarme_co2_haute: number;
    alarme_o2_haute: number;
}
