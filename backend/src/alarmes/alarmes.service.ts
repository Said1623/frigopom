import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alarme } from './alarme.entity';

@Injectable()
export class AlarmesService {
  constructor(@InjectRepository(Alarme) private repo: Repository<Alarme>) {}

  findActives(chambreId?: number) {
    const where: any = { acquittee: false };
    if (chambreId) where.chambre_id = chambreId;
    return this.repo.find({ where, order: { declenchee_at: 'DESC' }, relations: ['chambre'] });
  }

  findByUnite(uniteId: number) {
    return this.repo
      .createQueryBuilder('a')
      .leftJoinAndSelect('a.chambre', 'ch')
      .where('ch.unite_id = :uniteId', { uniteId })
      .orderBy('a.declenchee_at', 'DESC')
      .take(50)
      .getMany();
  }

  create(dto: Partial<Alarme>) {
    return this.repo.save(this.repo.create(dto));
  }

  async acquitter(id: number, par: string) {
    await this.repo.update(id, {
      acquittee: true,
      acquittee_par: par,
      acquittee_at: new Date(),
    });
    return this.repo.findOne({ where: { id } });
  }
}
