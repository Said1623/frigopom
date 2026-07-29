"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MesuresModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const mesure_entity_1 = require("./mesure.entity");
const mesures_service_1 = require("./mesures.service");
const mesures_controller_1 = require("./mesures.controller");
let MesuresModule = class MesuresModule {
};
exports.MesuresModule = MesuresModule;
exports.MesuresModule = MesuresModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([mesure_entity_1.Mesure])],
        providers: [mesures_service_1.MesuresService],
        controllers: [mesures_controller_1.MesuresController],
        exports: [mesures_service_1.MesuresService],
    })
], MesuresModule);
//# sourceMappingURL=mesures.module.js.map