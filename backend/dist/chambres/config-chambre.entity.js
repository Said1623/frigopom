"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigChambre = void 0;
const typeorm_1 = require("typeorm");
const chambre_entity_1 = require("./chambre.entity");
let ConfigChambre = class ConfigChambre {
};
exports.ConfigChambre = ConfigChambre;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ConfigChambre.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => chambre_entity_1.Chambre, (c) => c.config),
    (0, typeorm_1.JoinColumn)({ name: 'chambre_id' }),
    __metadata("design:type", chambre_entity_1.Chambre)
], ConfigChambre.prototype, "chambre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ConfigChambre.prototype, "chambre_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 1.0 }),
    __metadata("design:type", Number)
], ConfigChambre.prototype, "temp_consigne", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0.0 }),
    __metadata("design:type", Number)
], ConfigChambre.prototype, "temp_min", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 2.0 }),
    __metadata("design:type", Number)
], ConfigChambre.prototype, "temp_max", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 92.0 }),
    __metadata("design:type", Number)
], ConfigChambre.prototype, "hum_consigne", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 88.0 }),
    __metadata("design:type", Number)
], ConfigChambre.prototype, "hum_min", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 96.0 }),
    __metadata("design:type", Number)
], ConfigChambre.prototype, "hum_max", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 2.0 }),
    __metadata("design:type", Number)
], ConfigChambre.prototype, "co2_consigne", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 1.0 }),
    __metadata("design:type", Number)
], ConfigChambre.prototype, "co2_min", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 3.0 }),
    __metadata("design:type", Number)
], ConfigChambre.prototype, "co2_max", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], ConfigChambre.prototype, "o2_consigne", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], ConfigChambre.prototype, "o2_min", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], ConfigChambre.prototype, "o2_max", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 3.0 }),
    __metadata("design:type", Number)
], ConfigChambre.prototype, "alarme_temp_haute", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: -1.0 }),
    __metadata("design:type", Number)
], ConfigChambre.prototype, "alarme_temp_basse", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 85.0 }),
    __metadata("design:type", Number)
], ConfigChambre.prototype, "alarme_hum_basse", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 5.0 }),
    __metadata("design:type", Number)
], ConfigChambre.prototype, "alarme_co2_haute", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], ConfigChambre.prototype, "alarme_o2_haute", void 0);
exports.ConfigChambre = ConfigChambre = __decorate([
    (0, typeorm_1.Entity)('config_chambres')
], ConfigChambre);
//# sourceMappingURL=config-chambre.entity.js.map