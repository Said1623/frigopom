import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './stock.entity';

@Injectable()
export class StocksService {
  constructor(@InjectRepository(Stock) private repo: Repository<Stock>) {}

  findByChambre(chambreId: number) {
    return this.repo.find({
      where: { chambre_id: chambreId, statut: 'en_stock' },
      order: { date_entree: 'DESC' },
    });
  }

  findByUnite(uniteId: number) {
    return this.repo
      .createQueryBuilder('s')
      .leftJoinAndSelect('s.chambre', 'ch')
      .where('ch.unite_id = :uniteId AND s.statut = :statut', { uniteId, statut: 'en_stock' })
      .getMany();
  }

  create(dto: Partial<Stock>) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: Partial<Stock>) {
    await this.repo.update(id, dto);
    return this.repo.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.repo.update(id, { statut: 'sorti', date_sortie_reelle: new Date() });
  }
}
