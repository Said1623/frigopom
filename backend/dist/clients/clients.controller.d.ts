import { ClientsService } from './clients.service';
export declare class ClientsController {
    private service;
    constructor(service: ClientsService);
    findAll(): Promise<import("./client.entity").Client[]>;
    findOne(id: string): Promise<import("./client.entity").Client>;
    create(body: any): Promise<import("./client.entity").Client>;
    update(id: string, body: any): Promise<import("./client.entity").Client>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
