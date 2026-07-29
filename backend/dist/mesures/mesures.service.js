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
exports.MesuresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mesure_entity_1 = require("./mesure.entity");
let MesuresService = class MesuresService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const m = this.repo.create(dto);
        return this.repo.save(m);
    }
    findByChambre(chambreId, limit = 100) {
        return this.repo.find({
            where: { chambre_id: chambreId },
            order: { horodatage: 'DESC' },
            take: limit,
        });
    }
    findByPeriode(chambreId, debut, fin) {
        return this.repo.find({
            where: { chambre_id: chambreId, horodatage: (0, typeorm_2.Between)(debut, fin) },
            order: { horodatage: 'ASC' },
        });
    }
    async getLast(chambreId) {
        return this.repo.findOne({
            where: { chambre_id: chambreId },
            order: { horodatage: 'DESC' },
        });
    }
    async getStats(chambreId, heures = 24) {
        const since = new Date(Date.now() - heures * 3600000);
        const mesures = await this.repo.find({
            where: { chambre_id: chambreId, horodatage: (0, typeorm_2.Between)(since, new Date()) },
        });
        if (!mesures.length)
            return null;
        const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
        const temps = mesures.map(m => m.temperature).filter(v => v != null);
        const hums = mesures.map(m => m.humidite).filter(v => v != null);
        const co2s = mesures.map(m => m.co2).filter(v => v != null);
        return {
            nb_mesures: mesures.length,
            temperature: { min: Math.min(...temps), max: Math.max(...temps), moy: avg(temps) },
            humidite: { min: Math.min(...hums), max: Math.max(...hums), moy: avg(hums) },
            co2: { min: Math.min(...co2s), max: Math.max(...co2s), moy: avg(co2s) },
        };
    }
};
exports.MesuresService = MesuresService;
exports.MesuresService = MesuresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mesure_entity_1.Mesure)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MesuresService);
//# sourceMappingURL=mesures.service.js.map