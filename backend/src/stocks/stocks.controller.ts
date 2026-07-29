import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StocksService } from './stocks.service';

@UseGuards(AuthGuard('jwt'))
@Controller('stocks')
export class StocksController {
  constructor(private service: StocksService) {}

  @Get('chambre/:id')
  byChambre(@Param('id') id: string) { return this.service.findByChambre(+id); }

  @Get('unite/:id')
  byUnite(@Param('id') id: string) { return this.service.findByUnite(+id); }

  @Post()
  create(@Body() body: any) { return this.service.create(body); }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) { return this.service.update(+id, body); }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.service.remove(+id); }
}
