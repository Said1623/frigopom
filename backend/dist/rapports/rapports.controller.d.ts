import { RapportsService } from './rapports.service';
export declare class RapportsController {
    private service;
    constructor(service: RapportsService);
    journalier(id: string, date: string): Promise<{
        unite_id: number;
        date: string;
        message: string;
    }>;
}
