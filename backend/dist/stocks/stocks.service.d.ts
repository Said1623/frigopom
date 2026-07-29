import { Repository } from 'typeorm';
import { Stock } from './stock.entity';
export declare class StocksService {
    private repo;
    constructor(repo: Repository<Stock>);
    findByChambre(chambreId: number): Promise<Stock[]>;
    findByUnite(uniteId: number): Promise<Stock[]>;
    create(dto: Partial<Stock>): Promise<Stock>;
    update(id: number, dto: Partial<Stock>): Promise<Stock>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
