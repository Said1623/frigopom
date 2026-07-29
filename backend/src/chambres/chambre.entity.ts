import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { UnitesFrigo } from '../unites/unites.entity';
import { ConfigChambre } from './config-chambre.entity';
import { Mesure } from '../mesures/mesure.entity';
import { Alarme } from '../alarmes/alarme.entity';
import { Stock } from '../stocks/stock.entity';

@Entity('chambres')
export class Chambre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @Column()
  nom: string;

  @Column({ nullable: true, type: 'float' })
  volume_m3: number;

  @Column({ nullable: true })
  capacite_palettes: number;

  @Column({ default: 'AC', comment: 'AC | ULO | Standard' })
  type_atmosphere: string;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => UnitesFrigo, (u) => u.chambres)
  @JoinColumn({ name: 'unite_id' })
  unite: UnitesFrigo;

  @Column()
  unite_id: number;

  @OneToOne(() => ConfigChambre, (c) => c.chambre, { cascade: true })
  config: ConfigChambre;

  @OneToMany(() => Mesure, (m) => m.chambre)
  mesures: Mesure[];

  @OneToMany(() => Alarme, (a) => a.chambre)
  alarmes: Alarme[];

  @OneToMany(() => Stock, (s) => s.chambre)
  stocks: Stock[];

  @CreateDateColumn()
  createdAt: Date;
}
