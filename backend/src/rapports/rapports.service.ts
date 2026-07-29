import { Injectable } from '@nestjs/common';

@Injectable()
export class RapportsService {
  async genererRapportJournalier(uniteId: number, date: string) {
    return {
      unite_id: uniteId,
      date,
      message: 'Rapport PDF à implémenter avec pdfkit ou puppeteer',
    };
  }
}
