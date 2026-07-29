import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Chambre } from '../chambres/chambre.entity';

@Entity('stocks')
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Chambre, (c) => c.stocks)
  @JoinColumn({ name: 'chambre_id' })
  chambre: Chambre;

  @Column()
  chambre_id: number;

  @Column()
  client_nom: string;

  @Column()
  variete: string;

  @Column({ default: 0 })
  nb_palettes: number;

  @Column({ type: 'float', default: 0 })
  poids_tonnes: number;

  @Column({ type: 'date', nullable: true })
  date_entree: Date;

  @Column({ type: 'date', nullable: true })
  date_sortie_prevue: Date;

  @Column({ type: 'date', nullable: true })
  date_sortie_reelle: Date;

  @Column({ default: 'en_stock', comment: 'en_stock | sorti | reserve' })
  statut: string;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;
}
