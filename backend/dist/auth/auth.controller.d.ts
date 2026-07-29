import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
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
    getProfile(req: any): Promise<import("./user.entity").User>;
    createUser(body: any): Promise<{
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
}
