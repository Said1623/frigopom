import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chambre } from './chambre.entity';
import { ConfigChambre } from './config-chambre.entity';

@Injectable()
export class ChambresService {
  constructor(
    @InjectRepository(Chambre) private repo: Repository<Chambre>,
    @InjectRepository(ConfigChambre) private configRepo: Repository<ConfigChambre>,
  ) {}

  findByUnite(uniteId: number) {
    return this.repo.find({
      where: { unite_id: uniteId, active: true },
      relations: ['config'],
      order: { numero: 'ASC' },
    });
  }

  async findOne(id: number) {
    const c = await this.repo.findOne({
      where: { id },
      relations: ['config', 'unite'],
    });
    if (!c) throw new NotFoundException('Chambre introuvable');
    return c;
  }

  async create(dto: any) {
    const chambre = this.repo.create(dto);
    const saved = await this.repo.save(chambre) as unknown as Chambre;
    const config = this.configRepo.create({ chambre_id: saved.id });
    await this.configRepo.save(config);
    return this.findOne(saved.id);
  }

  async update(id: number, dto: any) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async updateConfig(chambreId: number, dto: Partial<ConfigChambre>) {
    let config = await this.configRepo.findOne({ where: { chambre_id: chambreId } });
    if (!config) {
      config = this.configRepo.create({ chambre_id: chambreId, ...dto });
    } else {
      Object.assign(config, dto);
    }
    return this.configRepo.save(config);
  }

  async remove(id: number) {
    await this.repo.update(id, { active: false });
    return { message: 'Chambre désactivée' };
  }

  async getLastMesures(uniteId: number) {
    const chambres = await this.findByUnite(uniteId);
    const result = [];
    for (const ch of chambres) {
      const lastMesure = await this.repo.query(
        `SELECT * FROM mesures WHERE chambre_id = $1 ORDER BY horodatage DESC LIMIT 1`,
        [ch.id],
      );
      result.push({ ...ch, derniere_mesure: lastMesure[0] || null });
    }
    return result;
  }
}
