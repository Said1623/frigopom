import { MesuresService } from './mesures.service';
export declare class MesuresController {
    private service;
    constructor(service: MesuresService);
    create(body: any, req: any): Promise<import("./mesure.entity").Mesure>;
    findByChambre(id: string, limit: string): Promise<import("./mesure.entity").Mesure[]>;
    getLast(id: string): Promise<import("./mesure.entity").Mesure>;
    getStats(id: string, h: string): Promise<{
        nb_mesures: number;
        temperature: {
            min: number;
            max: number;
            moy: number;
        };
        humidite: {
            min: number;
            max: number;
            moy: number;
        };
        co2: {
            min: number;
            max: number;
            moy: number;
        };
    }>;
    getByPeriode(id: string, debut: string, fin: string): Promise<import("./mesure.entity").Mesure[]>;
}
