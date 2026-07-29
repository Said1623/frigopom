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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MesuresController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const mesures_service_1 = require("./mesures.service");
let MesuresController = class MesuresController {
    constructor(service) {
        this.service = service;
    }
    create(body, req) {
        body.source = body.source || 'manuel';
        body.operateur = body.operateur || req.user.email;
        return this.service.create(body);
    }
    findByChambre(id, limit) {
        return this.service.findByChambre(+id, limit ? +limit : 100);
    }
    getLast(id) {
        return this.service.getLast(+id);
    }
    getStats(id, h) {
        return this.service.getStats(+id, h ? +h : 24);
    }
    getByPeriode(id, debut, fin) {
        return this.service.findByPeriode(+id, new Date(debut), new Date(fin));
    }
};
exports.MesuresController = MesuresController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MesuresController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('chambre/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MesuresController.prototype, "findByChambre", null);
__decorate([
    (0, common_1.Get)('chambre/:id/last'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MesuresController.prototype, "getLast", null);
__decorate([
    (0, common_1.Get)('chambre/:id/stats'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('heures')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MesuresController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('chambre/:id/periode'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('debut')),
    __param(2, (0, common_1.Query)('fin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], MesuresController.prototype, "getByPeriode", null);
exports.MesuresController = MesuresController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('mesures'),
    __metadata("design:paramtypes", [mesures_service_1.MesuresService])
], MesuresController);
//# sourceMappingURL=mesures.controller.js.map