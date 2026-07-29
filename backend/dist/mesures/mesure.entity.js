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
exports.Mesure = void 0;
const typeorm_1 = require("typeorm");
const chambre_entity_1 = require("../chambres/chambre.entity");
let Mesure = class Mesure {
};
exports.Mesure = Mesure;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Mesure.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chambre_entity_1.Chambre, (c) => c.mesures),
    (0, typeorm_1.JoinColumn)({ name: 'chambre_id' }),
    __metadata("design:type", chambre_entity_1.Chambre)
], Mesure.prototype, "chambre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Mesure.prototype, "chambre_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Mesure.prototype, "temperature", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Mesure.prototype, "humidite", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Mesure.prototype, "co2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Mesure.prototype, "o2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Mesure.prototype, "ethylene", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'manuel', comment: 'manuel | automate' }),
    __metadata("design:type", String)
], Mesure.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Mesure.prototype, "operateur", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Mesure.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Mesure.prototype, "horodatage", void 0);
exports.Mesure = Mesure = __decorate([
    (0, typeorm_1.Entity)('mesures')
], Mesure);
//# sourceMappingURL=mesure.entity.js.map