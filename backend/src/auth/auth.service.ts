import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({
      where: { email, actif: true },
      relations: ['client'],
    });
    if (!user) throw new UnauthorizedException('Email ou mot de passe incorrect');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Email ou mot de passe incorrect');
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
      client_id: user.client_id,
    });
    const { password: _, ...userSafe } = user;
    return { token, user: userSafe };
  }

  async createUser(dto: any) {
    const exists = await this.userRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email déjà utilisé');
    const hash = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password: hash });
    const saved = await this.userRepo.save(user) as unknown as User;
    const { password: _, ...safe } = saved;
    return safe;
  }

  async getProfile(userId: number) {
    return this.userRepo.findOne({
      where: { id: userId },
      relations: ['client'],
    });
  }

  async getUsersByClient(clientId: number) {
    return this.userRepo.find({ where: { client_id: clientId } });
  }
}