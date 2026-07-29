import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chambre } from './chambre.entity';
import { ConfigChambre } from './config-chambre.entity';
import { ChambresService } from './chambres.service';
import { ChambresController } from './chambres.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Chambre, ConfigChambre])],
  providers: [ChambresService],
  controllers: [ChambresController],
  exports: [ChambresService],
})
export class ChambresModule {}
