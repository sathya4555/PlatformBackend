import { DtoBase } from "requestmodal/DtoBase";
import { App } from "src/entity/app.entity";
import { Role } from "src/entity/role.entity";
import { appDTO } from "./appDTO";

export class featureDTO extends DtoBase{
    constructor() {
        super();
    }

        id: number;

        featurename: string;

        adminname: string;
    
        // @Column({ nullable: true, array: true },)
        // methodname: string[];

        featuredesciption: string;
    

        app:App
        // @ManyToMany(() => Client, role => role.roles)
        // clients?: Client[]
    

      }