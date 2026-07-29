import { AlarmesService } from './alarmes.service';
export declare class AlarmesController {
    private service;
    constructor(service: AlarmesService);
    actives(id: string): Promise<import("./alarme.entity").Alarme[]>;
    byUnite(id: string): Promise<import("./alarme.entity").Alarme[]>;
    create(body: any): Promise<import("./alarme.entity").Alarme>;
    acquitter(id: string, req: any): Promise<import("./alarme.entity").Alarme>;
}
