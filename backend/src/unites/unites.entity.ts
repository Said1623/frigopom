import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Client } from '../clients/client.entity';
import { Chambre } from '../chambres/chambre.entity';

@Entity('unites_frigo')
export class UnitesFrigo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ nullable: true })
  adresse: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0 })
  nombre_chambres: number;

  @Column({ default: true })
  actif: boolean;

  @Column({ default: 'manuel', comment: 'manuel | automate' })
  source_donnees: string;

  @Column({ nullable: true, comment: 'IP ou URL de l automate si source=automate' })
  automate_url: string;

  @ManyToOne(() => Client, (c) => c.unites)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column()
  client_id: number;

  @OneToMany(() => Chambre, (c) => c.unite)
  chambres: Chambre[];

  @CreateDateColumn()
  createdAt: Date;
}
