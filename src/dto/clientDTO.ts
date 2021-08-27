import { DtoBase } from "requestmodal/DtoBase";
import { Admin } from "src/entity/admin.entity";
import { Role } from "src/entity/role.entity";

export class clienDTO extends DtoBase{
    constructor() {
        super();
       
      }


    name: string;

    adminname: string;

    roleid: Role;
    
    id: number;


    rolename: string;

    admin: Admin
// clients?: Role

    public methodname: string[];

}