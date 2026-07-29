import { Repository } from 'typeorm';
import { Chambre } from './chambre.entity';
import { ConfigChambre } from './config-chambre.entity';
export declare class ChambresService {
    private repo;
    private configRepo;
    constructor(repo: Repository<Chambre>, configRepo: Repository<ConfigChambre>);
    findByUnite(uniteId: number): Promise<Chambre[]>;
    findOne(id: number): Promise<Chambre>;
    create(dto: any): Promise<Chambre>;
    update(id: number, dto: any): Promise<Chambre>;
    updateConfig(chambreId: number, dto: Partial<ConfigChambre>): Promise<ConfigChambre>;
    remove(id: number): Promise<{
        message: string;
    }>;
    getLastMesures(uniteId: number): Promise<any[]>;
}
