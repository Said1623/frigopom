import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Chambre } from '../chambres/chambre.entity';

export enum AlarmNiveau {
  CRITIQUE = 'critique',
  AVERTISSEMENT = 'avertissement',
  INFO = 'info',
}

export enum AlarmType {
  TEMP_HAUTE = 'temp_haute',
  TEMP_BASSE = 'temp_basse',
  HUM_BASSE = 'hum_basse',
  HUM_HAUTE = 'hum_haute',
  CO2_HAUT = 'co2_haut',
  O2_HAUT = 'o2_haut',
  PORTE_OUVERTE = 'porte_ouverte',
  COUPURE_ELEC = 'coupure_elec',
  AUTRE = 'autre',
}

@Entity('alarmes')
export class Alarme {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Chambre, (c) => c.alarmes)
  @JoinColumn({ name: 'chambre_id' })
  chambre: Chambre;

  @Column()
  chambre_id: number;

  @Column({ type: 'enum', enum: AlarmType })
  type: AlarmType;

  @Column({ type: 'enum', enum: AlarmNiveau, default: AlarmNiveau.AVERTISSEMENT })
  niveau: AlarmNiveau;

  @Column()
  message: string;

  @Column({ type: 'float', nullable: true })
  valeur_mesuree: number;

  @Column({ type: 'float', nullable: true })
  seuil: number;

  @Column({ default: false })
  acquittee: boolean;

  @Column({ nullable: true })
  acquittee_par: string;

  @Column({ type: 'timestamp', nullable: true })
  acquittee_at: Date;

  @CreateDateColumn()
  declenchee_at: Date;
}
