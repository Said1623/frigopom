import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Client } from '../clients/client.entity';

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  OPERATEUR = 'operateur',
  LECTEUR = 'lecteur',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.OPERATEUR })
  role: UserRole;

  @Column({ default: true })
  actif: boolean;

  @ManyToOne(() => Client, (c) => c.users, { nullable: true })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ nullable: true })
  client_id: number;

  @CreateDateColumn()
  createdAt: Date;
}
