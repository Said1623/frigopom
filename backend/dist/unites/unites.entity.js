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
exports.UnitesFrigo = void 0;
const typeorm_1 = require("typeorm");
const client_entity_1 = require("../clients/client.entity");
const chambre_entity_1 = require("../chambres/chambre.entity");
let UnitesFrigo = class UnitesFrigo {
};
exports.UnitesFrigo = UnitesFrigo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UnitesFrigo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UnitesFrigo.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UnitesFrigo.prototype, "adresse", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UnitesFrigo.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], UnitesFrigo.prototype, "nombre_chambres", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], UnitesFrigo.prototype, "actif", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'manuel', comment: 'manuel | automate' }),
    __metadata("design:type", String)
], UnitesFrigo.prototype, "source_donnees", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: 'IP ou URL de l automate si source=automate' }),
    __metadata("design:type", String)
], UnitesFrigo.prototype, "automate_url", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client, (c) => c.unites),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", client_entity_1.Client)
], UnitesFrigo.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UnitesFrigo.prototype, "client_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chambre_entity_1.Chambre, (c) => c.unite),
    __metadata("design:type", Array)
], UnitesFrigo.prototype, "chambres", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UnitesFrigo.prototype, "createdAt", void 0);
exports.UnitesFrigo = UnitesFrigo = __decorate([
    (0, typeorm_1.Entity)('unites_frigo')
], UnitesFrigo);
//# sourceMappingURL=unites.entity.js.map