import { DtoBase } from "requestmodal/DtoBase";
import { Admin } from "src/entity/admin.entity";
import { Role } from "src/entity/role.entity";

export class adminDTO extends DtoBase{
    constructor() {
        super();
       
      }

    //   id: string;

      name: string;
  
      password: string;
 
  }