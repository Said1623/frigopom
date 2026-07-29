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
exports.Chambre = void 0;
const typeorm_1 = require("typeorm");
const unites_entity_1 = require("../unites/unites.entity");
const config_chambre_entity_1 = require("./config-chambre.entity");
const mesure_entity_1 = require("../mesures/mesure.entity");
const alarme_entity_1 = require("../alarmes/alarme.entity");
const stock_entity_1 = require("../stocks/stock.entity");
let Chambre = class Chambre {
};
exports.Chambre = Chambre;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Chambre.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Chambre.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Chambre.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'float' }),
    __metadata("design:type", Number)
], Chambre.prototype, "volume_m3", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Chambre.prototype, "capacite_palettes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'AC', comment: 'AC | ULO | Standard' }),
    __metadata("design:type", String)
], Chambre.prototype, "type_atmosphere", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Chambre.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unites_entity_1.UnitesFrigo, (u) => u.chambres),
    (0, typeorm_1.JoinColumn)({ name: 'unite_id' }),
    __metadata("design:type", unites_entity_1.UnitesFrigo)
], Chambre.prototype, "unite", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Chambre.prototype, "unite_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => config_chambre_entity_1.ConfigChambre, (c) => c.chambre, { cascade: true }),
    __metadata("design:type", config_chambre_entity_1.ConfigChambre)
], Chambre.prototype, "config", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mesure_entity_1.Mesure, (m) => m.chambre),
    __metadata("design:type", Array)
], Chambre.prototype, "mesures", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => alarme_entity_1.Alarme, (a) => a.chambre),
    __metadata("design:type", Array)
], Chambre.prototype, "alarmes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => stock_entity_1.Stock, (s) => s.chambre),
    __metadata("design:type", Array)
], Chambre.prototype, "stocks", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Chambre.prototype, "createdAt", void 0);
exports.Chambre = Chambre = __decorate([
    (0, typeorm_1.Entity)('chambres')
], Chambre);
//# sourceMappingURL=chambre.entity.js.map