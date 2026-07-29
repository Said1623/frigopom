import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Chambre } from '../chambres/chambre.entity';

@Entity('mesures')
export class Mesure {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Chambre, (c) => c.mesures)
  @JoinColumn({ name: 'chambre_id' })
  chambre: Chambre;

  @Column()
  chambre_id: number;

  @Column({ type: 'float', nullable: true })
  temperature: number;

  @Column({ type: 'float', nullable: true })
  humidite: number;

  @Column({ type: 'float', nullable: true })
  co2: number;

  @Column({ type: 'float', nullable: true })
  o2: number;

  @Column({ type: 'float', nullable: true })
  ethylene: number;

  @Column({ default: 'manuel', comment: 'manuel | automate' })
  source: string;

  @Column({ nullable: true })
  operateur: string;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  horodatage: Date;
}
