import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientsService {
  constructor(@InjectRepository(Client) private repo: Repository<Client>) {}

  findAll() {
    return this.repo.find({ where: { actif: true }, relations: ['unites'] });
  }

  async findOne(id: number) {
    const c = await this.repo.findOne({ where: { id }, relations: ['unites', 'users'] });
    if (!c) throw new NotFoundException('Client introuvable');
    return c;
  }

  create(dto: Partial<Client>) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: Partial<Client>) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.repo.update(id, { actif: false });
    return { message: 'Client désactivé' };
  }
}
