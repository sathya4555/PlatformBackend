import { DtoBase } from "requestmodal/DtoBase";
import { Client } from "src/entity/client.entity";
import { Role } from "src/entity/role.entity";

    export class roleDTO extends DtoBase{
        constructor() {
            super();
           
          }
    

    id: number;


    rolename: string;

    adminname: string;

    public methodname: string[];

   // clients?: Client[]
}