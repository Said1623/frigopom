import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { UnitesModule } from './unites/unites.module';
import { ChambresModule } from './chambres/chambres.module';
import { MesuresModule } from './mesures/mesures.module';
import { AlarmesModule } from './alarmes/alarmes.module';
import { StocksModule } from './stocks/stocks.module';
import { RapportsModule } from './rapports/rapports.module';

import { Client } from './clients/client.entity';
import { User } from './auth/user.entity';
import { UnitesFrigo } from './unites/unites.entity';
import { Chambre } from './chambres/chambre.entity';
import { ConfigChambre } from './chambres/config-chambre.entity';
import { Mesure } from './mesures/mesure.entity';
import { Alarme } from './alarmes/alarme.entity';
import { Stock } from './stocks/stock.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-frosty-heart-ale13sbj.c-3.eu-central-1.aws.neon.tech',
      port: 5432,
      username: 'neondb_owner',
      password: 'npg_c0jripgPORA7',
      database: 'neondb',
      ssl: { rejectUnauthorized: false },
      entities: [Client, User, UnitesFrigo, Chambre, ConfigChambre, Mesure, Alarme, Stock],
      synchronize: true,
    }),
    AuthModule,
    ClientsModule,
    UnitesModule,
    ChambresModule,
    MesuresModule,
    AlarmesModule,
    StocksModule,
    RapportsModule,
  ],
})
export class AppModule { }
