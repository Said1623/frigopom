import { StocksService } from './stocks.service';
export declare class StocksController {
    private service;
    constructor(service: StocksService);
    byChambre(id: string): Promise<import("./stock.entity").Stock[]>;
    byUnite(id: string): Promise<import("./stock.entity").Stock[]>;
    create(body: any): Promise<import("./stock.entity").Stock>;
    update(id: string, body: any): Promise<import("./stock.entity").Stock>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
