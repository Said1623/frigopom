import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AlarmesService } from './alarmes.service';

@UseGuards(AuthGuard('jwt'))
@Controller('alarmes')
export class AlarmesController {
  constructor(private service: AlarmesService) {}

  @Get('actives')
  actives(@Query('chambre_id') id: string) {
    return this.service.findActives(id ? +id : undefined);
  }

  @Get('unite/:uniteId')
  byUnite(@Param('uniteId') id: string) { return this.service.findByUnite(+id); }

  @Post()
  create(@Body() body: any) { return this.service.create(body); }

  @Put(':id/acquitter')
  acquitter(@Param('id') id: string, @Request() req) {
    return this.service.acquitter(+id, req.user.email);
  }
}
