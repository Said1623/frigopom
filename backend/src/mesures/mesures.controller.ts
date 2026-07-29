import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MesuresService } from './mesures.service';

@UseGuards(AuthGuard('jwt'))
@Controller('mesures')
export class MesuresController {
  constructor(private service: MesuresService) {}

  @Post()
  create(@Body() body: any, @Request() req) {
    body.source = body.source || 'manuel';
    body.operateur = body.operateur || req.user.email;
    return this.service.create(body);
  }

  @Get('chambre/:id')
  findByChambre(@Param('id') id: string, @Query('limit') limit: string) {
    return this.service.findByChambre(+id, limit ? +limit : 100);
  }

  @Get('chambre/:id/last')
  getLast(@Param('id') id: string) {
    return this.service.getLast(+id);
  }

  @Get('chambre/:id/stats')
  getStats(@Param('id') id: string, @Query('heures') h: string) {
    return this.service.getStats(+id, h ? +h : 24);
  }

  @Get('chambre/:id/periode')
  getByPeriode(
    @Param('id') id: string,
    @Query('debut') debut: string,
    @Query('fin') fin: string,
  ) {
    return this.service.findByPeriode(+id, new Date(debut), new Date(fin));
  }
}
