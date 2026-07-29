import { ChambresService } from './chambres.service';
export declare class ChambresController {
    private service;
    constructor(service: ChambresService);
    findByUnite(uniteId: string): Promise<import("./chambre.entity").Chambre[]>;
    getDashboard(uniteId: string): Promise<any[]>;
    findOne(id: string): Promise<import("./chambre.entity").Chambre>;
    create(body: any): Promise<import("./chambre.entity").Chambre>;
    update(id: string, body: any): Promise<import("./chambre.entity").Chambre>;
    updateConfig(id: string, body: any): Promise<import("./config-chambre.entity").ConfigChambre>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
