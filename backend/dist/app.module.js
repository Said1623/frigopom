"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const clients_module_1 = require("./clients/clients.module");
const unites_module_1 = require("./unites/unites.module");
const chambres_module_1 = require("./chambres/chambres.module");
const mesures_module_1 = require("./mesures/mesures.module");
const alarmes_module_1 = require("./alarmes/alarmes.module");
const stocks_module_1 = require("./stocks/stocks.module");
const rapports_module_1 = require("./rapports/rapports.module");
const client_entity_1 = require("./clients/client.entity");
const user_entity_1 = require("./auth/user.entity");
const unites_entity_1 = require("./unites/unites.entity");
const chambre_entity_1 = require("./chambres/chambre.entity");
const config_chambre_entity_1 = require("./chambres/config-chambre.entity");
const mesure_entity_1 = require("./mesures/mesure.entity");
const alarme_entity_1 = require("./alarmes/alarme.entity");
const stock_entity_1 = require("./stocks/stock.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'ep-frosty-heart-ale13sbj.c-3.eu-central-1.aws.neon.tech',
                port: 5432,
                username: 'neondb_owner',
                password: 'npg_c0jripgPORA7',
                database: 'neondb',
                ssl: { rejectUnauthorized: false },
                entities: [client_entity_1.Client, user_entity_1.User, unites_entity_1.UnitesFrigo, chambre_entity_1.Chambre, config_chambre_entity_1.ConfigChambre, mesure_entity_1.Mesure, alarme_entity_1.Alarme, stock_entity_1.Stock],
                synchronize: true,
            }),
            auth_module_1.AuthModule,
            clients_module_1.ClientsModule,
            unites_module_1.UnitesModule,
            chambres_module_1.ChambresModule,
            mesures_module_1.MesuresModule,
            alarmes_module_1.AlarmesModule,
            stocks_module_1.StocksModule,
            rapports_module_1.RapportsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map