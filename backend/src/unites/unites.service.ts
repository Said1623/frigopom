import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnitesFrigo } from './unites.entity';

@Injectable()
export class UnitesService {
  constructor(@InjectRepository(UnitesFrigo) private repo: Repository<UnitesFrigo>) {}

  findByClient(clientId: number) {
    return this.repo.find({
      where: { client_id: clientId, actif: true },
      relations: ['chambres'],
    });
  }

  findAll() {
    return this.repo.find({ where: { actif: true }, relations: ['client', 'chambres'] });
  }

  async findOne(id: number) {
    const u = await this.repo.findOne({
      where: { id },
      relations: ['client', 'chambres', 'chambres.config'],
    });
    if (!u) throw new NotFoundException('Unité introuvable');
    return u;
  }

  async create(dto: Partial<UnitesFrigo>) {
    const unite = this.repo.create(dto);
    return this.repo.save(unite);
  }

  async update(id: number, dto: Partial<UnitesFrigo>) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.repo.update(id, { actif: false });
    return { message: 'Unité désactivée' };
  }
}
