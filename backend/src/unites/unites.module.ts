import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitesFrigo } from './unites.entity';
import { UnitesService } from './unites.service';
import { UnitesController } from './unites.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UnitesFrigo])],
  providers: [UnitesService],
  controllers: [UnitesController],
  exports: [UnitesService],
})
export class UnitesModule {}
