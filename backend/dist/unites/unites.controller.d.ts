import { UnitesService } from './unites.service';
export declare class UnitesController {
    private service;
    constructor(service: UnitesService);
    findAll(req: any): Promise<import("./unites.entity").UnitesFrigo[]>;
    findOne(id: string): Promise<import("./unites.entity").UnitesFrigo>;
    create(body: any, req: any): Promise<import("./unites.entity").UnitesFrigo>;
    update(id: string, body: any): Promise<import("./unites.entity").UnitesFrigo>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
