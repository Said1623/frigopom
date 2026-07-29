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
exports.AlarmesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const alarme_entity_1 = require("./alarme.entity");
let AlarmesService = class AlarmesService {
    constructor(repo) {
        this.repo = repo;
    }
    findActives(chambreId) {
        const where = { acquittee: false };
        if (chambreId)
            where.chambre_id = chambreId;
        return this.repo.find({ where, order: { declenchee_at: 'DESC' }, relations: ['chambre'] });
    }
    findByUnite(uniteId) {
        return this.repo
            .createQueryBuilder('a')
            .leftJoinAndSelect('a.chambre', 'ch')
            .where('ch.unite_id = :uniteId', { uniteId })
            .orderBy('a.declenchee_at', 'DESC')
            .take(50)
            .getMany();
    }
    create(dto) {
        return this.repo.save(this.repo.create(dto));
    }
    async acquitter(id, par) {
        await this.repo.update(id, {
            acquittee: true,
            acquittee_par: par,
            acquittee_at: new Date(),
        });
        return this.repo.findOne({ where: { id } });
    }
};
exports.AlarmesService = AlarmesService;
exports.AlarmesService = AlarmesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(alarme_entity_1.Alarme)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AlarmesService);
//# sourceMappingURL=alarmes.service.js.map