"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlarmesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const alarme_entity_1 = require("./alarme.entity");
const alarmes_service_1 = require("./alarmes.service");
const alarmes_controller_1 = require("./alarmes.controller");
let AlarmesModule = class AlarmesModule {
};
exports.AlarmesModule = AlarmesModule;
exports.AlarmesModule = AlarmesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([alarme_entity_1.Alarme])],
        providers: [alarmes_service_1.AlarmesService],
        controllers: [alarmes_controller_1.AlarmesController],
        exports: [alarmes_service_1.AlarmesService],
    })
], AlarmesModule);
//# sourceMappingURL=alarmes.module.js.map