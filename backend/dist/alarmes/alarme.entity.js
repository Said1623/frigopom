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
exports.Alarme = exports.AlarmType = exports.AlarmNiveau = void 0;
const typeorm_1 = require("typeorm");
const chambre_entity_1 = require("../chambres/chambre.entity");
var AlarmNiveau;
(function (AlarmNiveau) {
    AlarmNiveau["CRITIQUE"] = "critique";
    AlarmNiveau["AVERTISSEMENT"] = "avertissement";
    AlarmNiveau["INFO"] = "info";
})(AlarmNiveau || (exports.AlarmNiveau = AlarmNiveau = {}));
var AlarmType;
(function (AlarmType) {
    AlarmType["TEMP_HAUTE"] = "temp_haute";
    AlarmType["TEMP_BASSE"] = "temp_basse";
    AlarmType["HUM_BASSE"] = "hum_basse";
    AlarmType["HUM_HAUTE"] = "hum_haute";
    AlarmType["CO2_HAUT"] = "co2_haut";
    AlarmType["O2_HAUT"] = "o2_haut";
    AlarmType["PORTE_OUVERTE"] = "porte_ouverte";
    AlarmType["COUPURE_ELEC"] = "coupure_elec";
    AlarmType["AUTRE"] = "autre";
})(AlarmType || (exports.AlarmType = AlarmType = {}));
let Alarme = class Alarme {
};
exports.Alarme = Alarme;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Alarme.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chambre_entity_1.Chambre, (c) => c.alarmes),
    (0, typeorm_1.JoinColumn)({ name: 'chambre_id' }),
    __metadata("design:type", chambre_entity_1.Chambre)
], Alarme.prototype, "chambre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Alarme.prototype, "chambre_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: AlarmType }),
    __metadata("design:type", String)
], Alarme.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: AlarmNiveau, default: AlarmNiveau.AVERTISSEMENT }),
    __metadata("design:type", String)
], Alarme.prototype, "niveau", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Alarme.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Alarme.prototype, "valeur_mesuree", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Alarme.prototype, "seuil", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Alarme.prototype, "acquittee", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Alarme.prototype, "acquittee_par", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Alarme.prototype, "acquittee_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Alarme.prototype, "declenchee_at", void 0);
exports.Alarme = Alarme = __decorate([
    (0, typeorm_1.Entity)('alarmes')
], Alarme);
//# sourceMappingURL=alarme.entity.js.map