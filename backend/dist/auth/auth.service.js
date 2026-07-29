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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./user.entity");
let AuthService = class AuthService {
    constructor(userRepo, jwtService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
    }
    async login(email, password) {
        const user = await this.userRepo.findOne({
            where: { email, actif: true },
            relations: ['client'],
        });
        if (!user)
            throw new common_1.UnauthorizedException('Email ou mot de passe incorrect');
        const valid = await bcrypt.compare(password, user.password);
        if (!valid)
            throw new common_1.UnauthorizedException('Email ou mot de passe incorrect');
        const token = this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role,
            client_id: user.client_id,
        });
        const { password: _, ...userSafe } = user;
        return { token, user: userSafe };
    }
    async createUser(dto) {
        const exists = await this.userRepo.findOne({ where: { email: dto.email } });
        if (exists)
            throw new common_1.ConflictException('Email déjà utilisé');
        const hash = await bcrypt.hash(dto.password, 10);
        const user = this.userRepo.create({ ...dto, password: hash });
        const saved = await this.userRepo.save(user);
        const { password: _, ...safe } = saved;
        return safe;
    }
    async getProfile(userId) {
        return this.userRepo.findOne({
            where: { id: userId },
            relations: ['client'],
        });
    }
    async getUsersByClient(clientId) {
        return this.userRepo.find({ where: { client_id: clientId } });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map