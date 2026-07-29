import { Repository } from 'typeorm';
import { UnitesFrigo } from './unites.entity';
export declare class UnitesService {
    private repo;
    constructor(repo: Repository<UnitesFrigo>);
    findByClient(clientId: number): Promise<UnitesFrigo[]>;
    findAll(): Promise<UnitesFrigo[]>;
    findOne(id: number): Promise<UnitesFrigo>;
    create(dto: Partial<UnitesFrigo>): Promise<UnitesFrigo>;
    update(id: number, dto: Partial<UnitesFrigo>): Promise<UnitesFrigo>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
