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
exports.ChambresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const chambre_entity_1 = require("./chambre.entity");
const config_chambre_entity_1 = require("./config-chambre.entity");
let ChambresService = class ChambresService {
    constructor(repo, configRepo) {
        this.repo = repo;
        this.configRepo = configRepo;
    }
    findByUnite(uniteId) {
        return this.repo.find({
            where: { unite_id: uniteId, active: true },
            relations: ['config'],
            order: { numero: 'ASC' },
        });
    }
    async findOne(id) {
        const c = await this.repo.findOne({
            where: { id },
            relations: ['config', 'unite'],
        });
        if (!c)
            throw new common_1.NotFoundException('Chambre introuvable');
        return c;
    }
    async create(dto) {
        const chambre = this.repo.create(dto);
        const saved = await this.repo.save(chambre);
        const config = this.configRepo.create({ chambre_id: saved.id });
        await this.configRepo.save(config);
        return this.findOne(saved.id);
    }
    async update(id, dto) {
        await this.repo.update(id, dto);
        return this.findOne(id);
    }
    async updateConfig(chambreId, dto) {
        let config = await this.configRepo.findOne({ where: { chambre_id: chambreId } });
        if (!config) {
            config = this.configRepo.create({ chambre_id: chambreId, ...dto });
        }
        else {
            Object.assign(config, dto);
        }
        return this.configRepo.save(config);
    }
    async remove(id) {
        await this.repo.update(id, { active: false });
        return { message: 'Chambre désactivée' };
    }
    async getLastMesures(uniteId) {
        const chambres = await this.findByUnite(uniteId);
        const result = [];
        for (const ch of chambres) {
            const lastMesure = await this.repo.query(`SELECT * FROM mesures WHERE chambre_id = $1 ORDER BY horodatage DESC LIMIT 1`, [ch.id]);
            result.push({ ...ch, derniere_mesure: lastMesure[0] || null });
        }
        return result;
    }
};
exports.ChambresService = ChambresService;
exports.ChambresService = ChambresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chambre_entity_1.Chambre)),
    __param(1, (0, typeorm_1.InjectRepository)(config_chambre_entity_1.ConfigChambre)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ChambresService);
//# sourceMappingURL=chambres.service.js.map