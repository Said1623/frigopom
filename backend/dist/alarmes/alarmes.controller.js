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
exports.AlarmesController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const alarmes_service_1 = require("./alarmes.service");
let AlarmesController = class AlarmesController {
    constructor(service) {
        this.service = service;
    }
    actives(id) {
        return this.service.findActives(id ? +id : undefined);
    }
    byUnite(id) { return this.service.findByUnite(+id); }
    create(body) { return this.service.create(body); }
    acquitter(id, req) {
        return this.service.acquitter(+id, req.user.email);
    }
};
exports.AlarmesController = AlarmesController;
__decorate([
    (0, common_1.Get)('actives'),
    __param(0, (0, common_1.Query)('chambre_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlarmesController.prototype, "actives", null);
__decorate([
    (0, common_1.Get)('unite/:uniteId'),
    __param(0, (0, common_1.Param)('uniteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlarmesController.prototype, "byUnite", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AlarmesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id/acquitter'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AlarmesController.prototype, "acquitter", null);
exports.AlarmesController = AlarmesController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('alarmes'),
    __metadata("design:paramtypes", [alarmes_service_1.AlarmesService])
], AlarmesController);
//# sourceMappingURL=alarmes.controller.js.map