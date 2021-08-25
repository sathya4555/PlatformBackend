import { DtoBase } from "requestmodal/DtoBase";
import { Role } from "src/entity/role.entity";

export class clienDTO extends DtoBase{
    constructor() {
        super();
       
      }


    name: string;

    adminname: string;

    roleid: string;
    
    id: number;


    rolename: string;

// clients?: Role

    public methodname: string[];

}