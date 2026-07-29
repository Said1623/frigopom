import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RapportsService } from './rapports.service';

@UseGuards(AuthGuard('jwt'))
@Controller('rapports')
export class RapportsController {
  constructor(private service: RapportsService) {}

  @Get('journalier/:uniteId')
  journalier(@Param('uniteId') id: string, @Query('date') date: string) {
    return this.service.genererRapportJournalier(+id, date || new Date().toISOString().split('T')[0]);
  }
}
