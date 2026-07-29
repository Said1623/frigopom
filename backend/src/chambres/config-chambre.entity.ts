import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Chambre } from './chambre.entity';

@Entity('config_chambres')
export class ConfigChambre {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Chambre, (c) => c.config)
  @JoinColumn({ name: 'chambre_id' })
  chambre: Chambre;

  @Column()
  chambre_id: number;

  @Column({ type: 'float', default: 1.0 })
  temp_consigne: number;

  @Column({ type: 'float', default: 0.0 })
  temp_min: number;

  @Column({ type: 'float', default: 2.0 })
  temp_max: number;

  @Column({ type: 'float', default: 92.0 })
  hum_consigne: number;

  @Column({ type: 'float', default: 88.0 })
  hum_min: number;

  @Column({ type: 'float', default: 96.0 })
  hum_max: number;

  @Column({ type: 'float', default: 2.0 })
  co2_consigne: number;

  @Column({ type: 'float', default: 1.0 })
  co2_min: number;

  @Column({ type: 'float', default: 3.0 })
  co2_max: number;

  @Column({ type: 'float', nullable: true })
  o2_consigne: number;

  @Column({ type: 'float', nullable: true })
  o2_min: number;

  @Column({ type: 'float', nullable: true })
  o2_max: number;

  @Column({ type: 'float', default: 3.0 })
  alarme_temp_haute: number;

  @Column({ type: 'float', default: -1.0 })
  alarme_temp_basse: number;

  @Column({ type: 'float', default: 85.0 })
  alarme_hum_basse: number;

  @Column({ type: 'float', default: 5.0 })
  alarme_co2_haute: number;

  @Column({ type: 'float', nullable: true })
  alarme_o2_haute: number;
}
