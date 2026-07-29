import { User } from '../auth/user.entity';
import { UnitesFrigo } from '../unites/unites.entity';
export declare class Client {
    id: number;
    nom: string;
    adresse: string;
    telephone: string;
    email: string;
    logo: string;
    actif: boolean;
    createdAt: Date;
    users: User[];
    unites: UnitesFrigo[];
}
