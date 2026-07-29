import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
export declare class AuthService {
    private userRepo;
    private jwtService;
    constructor(userRepo: Repository<User>, jwtService: JwtService);
    login(email: string, password: string): Promise<{
        token: string;
        user: {
            id: number;
            nom: string;
            prenom: string;
            email: string;
            role: import("./user.entity").UserRole;
            actif: boolean;
            client: import("../clients/client.entity").Client;
            client_id: number;
            createdAt: Date;
        };
    }>;
    createUser(dto: any): Promise<{
        id: number;
        nom: string;
        prenom: string;
        email: string;
        role: import("./user.entity").UserRole;
        actif: boolean;
        client: import("../clients/client.entity").Client;
        client_id: number;
        createdAt: Date;
    }>;
    getProfile(userId: number): Promise<User>;
    getUsersByClient(clientId: number): Promise<User[]>;
}
