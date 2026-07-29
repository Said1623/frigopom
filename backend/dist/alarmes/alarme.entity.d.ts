import { Chambre } from '../chambres/chambre.entity';
export declare enum AlarmNiveau {
    CRITIQUE = "critique",
    AVERTISSEMENT = "avertissement",
    INFO = "info"
}
export declare enum AlarmType {
    TEMP_HAUTE = "temp_haute",
    TEMP_BASSE = "temp_basse",
    HUM_BASSE = "hum_basse",
    HUM_HAUTE = "hum_haute",
    CO2_HAUT = "co2_haut",
    O2_HAUT = "o2_haut",
    PORTE_OUVERTE = "porte_ouverte",
    COUPURE_ELEC = "coupure_elec",
    AUTRE = "autre"
}
export declare class Alarme {
    id: number;
    chambre: Chambre;
    chambre_id: number;
    type: AlarmType;
    niveau: AlarmNiveau;
    message: string;
    valeur_mesuree: number;
    seuil: number;
    acquittee: boolean;
    acquittee_par: string;
    acquittee_at: Date;
    declenchee_at: Date;
}
