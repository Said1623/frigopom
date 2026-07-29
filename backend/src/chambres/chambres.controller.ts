import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChambresService } from './chambres.service';

@UseGuards(AuthGuard('jwt'))
@Controller('chambres')
export class ChambresController {
  constructor(private service: ChambresService) {}

  @Get('unite/:uniteId')
  findByUnite(@Param('uniteId') uniteId: string) {
    return this.service.findByUnite(+uniteId);
  }

  @Get('unite/:uniteId/dashboard')
  getDashboard(@Param('uniteId') uniteId: string) {
    return this.service.getLastMesures(+uniteId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.service.findOne(+id); }

  @Post()
  create(@Body() body: any) { return this.service.create(body); }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) { return this.service.update(+id, body); }

  @Put(':id/config')
  updateConfig(@Param('id') id: string, @Body() body: any) {
    return this.service.updateConfig(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.service.remove(+id); }
}
