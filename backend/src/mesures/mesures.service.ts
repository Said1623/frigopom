import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Mesure } from './mesure.entity';

@Injectable()
export class MesuresService {
  constructor(@InjectRepository(Mesure) private repo: Repository<Mesure>) {}

  async create(dto: Partial<Mesure>) {
    const m = this.repo.create(dto);
    return this.repo.save(m);
  }

  findByChambre(chambreId: number, limit = 100) {
    return this.repo.find({
      where: { chambre_id: chambreId },
      order: { horodatage: 'DESC' },
      take: limit,
    });
  }

  findByPeriode(chambreId: number, debut: Date, fin: Date) {
    return this.repo.find({
      where: { chambre_id: chambreId, horodatage: Between(debut, fin) },
      order: { horodatage: 'ASC' },
    });
  }

  async getLast(chambreId: number) {
    return this.repo.findOne({
      where: { chambre_id: chambreId },
      order: { horodatage: 'DESC' },
    });
  }

  async getStats(chambreId: number, heures = 24) {
    const since = new Date(Date.now() - heures * 3600000);
    const mesures = await this.repo.find({
      where: { chambre_id: chambreId, horodatage: Between(since, new Date()) },
    });
    if (!mesures.length) return null;
    const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
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
}
