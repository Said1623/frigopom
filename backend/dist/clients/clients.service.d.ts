import { Repository } from 'typeorm';
import { Client } from './client.entity';
export declare class ClientsService {
    private repo;
    constructor(repo: Repository<Client>);
    findAll(): Promise<Client[]>;
    findOne(id: number): Promise<Client>;
    create(dto: Partial<Client>): Promise<Client>;
    update(id: number, dto: Partial<Client>): Promise<Client>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
