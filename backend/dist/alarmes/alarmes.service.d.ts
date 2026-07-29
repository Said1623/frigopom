import { Repository } from 'typeorm';
import { Alarme } from './alarme.entity';
export declare class AlarmesService {
    private repo;
    constructor(repo: Repository<Alarme>);
    findActives(chambreId?: number): Promise<Alarme[]>;
    findByUnite(uniteId: number): Promise<Alarme[]>;
    create(dto: Partial<Alarme>): Promise<Alarme>;
    acquitter(id: number, par: string): Promise<Alarme>;
}
