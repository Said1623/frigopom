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
exports.RapportsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const rapports_service_1 = require("./rapports.service");
let RapportsController = class RapportsController {
    constructor(service) {
        this.service = service;
    }
    journalier(id, date) {
        return this.service.genererRapportJournalier(+id, date || new Date().toISOString().split('T')[0]);
    }
};
exports.RapportsController = RapportsController;
__decorate([
    (0, common_1.Get)('journalier/:uniteId'),
    __param(0, (0, common_1.Param)('uniteId')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RapportsController.prototype, "journalier", null);
exports.RapportsController = RapportsController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('rapports'),
    __metadata("design:paramtypes", [rapports_service_1.RapportsService])
], RapportsController);
//# sourceMappingURL=rapports.controller.js.map