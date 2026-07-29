import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnitesService } from './unites.service';

@UseGuards(AuthGuard('jwt'))
@Controller('unites')
export class UnitesController {
  constructor(private service: UnitesService) { }

  @Get()
  findAll(@Request() req) {
    const { role, client_id } = req.user;
    if (role === 'super_admin') return this.service.findAll();
    return this.service.findByClient(client_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.service.findOne(+id); }

  @Post()
  create(@Body() body: any, @Request() req) {
    if (!body.client_id && req.user.client_id) {
      body.client_id = req.user.client_id;
    }
    if (!body.client_id) {
      body.client_id = 1; // super_admin : client par défaut
    }
    return this.service.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) { return this.service.update(+id, body); }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.service.remove(+id); }
}
