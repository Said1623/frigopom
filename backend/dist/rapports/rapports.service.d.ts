export declare class RapportsService {
    genererRapportJournalier(uniteId: number, date: string): Promise<{
        unite_id: number;
        date: string;
        message: string;
    }>;
}
