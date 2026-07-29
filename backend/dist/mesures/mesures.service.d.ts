import { Repository } from 'typeorm';
import { Mesure } from './mesure.entity';
export declare class MesuresService {
    private repo;
    constructor(repo: Repository<Mesure>);
    create(dto: Partial<Mesure>): Promise<Mesure>;
    findByChambre(chambreId: number, limit?: number): Promise<Mesure[]>;
    findByPeriode(chambreId: number, debut: Date, fin: Date): Promise<Mesure[]>;
    getLast(chambreId: number): Promise<Mesure>;
    getStats(chambreId: number, heures?: number): Promise<{
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
}
