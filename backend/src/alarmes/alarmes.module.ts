import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alarme } from './alarme.entity';
import { AlarmesService } from './alarmes.service';
import { AlarmesController } from './alarmes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Alarme])],
  providers: [AlarmesService],
  controllers: [AlarmesController],
  exports: [AlarmesService],
})
export class AlarmesModule {}
