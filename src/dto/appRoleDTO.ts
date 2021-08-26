import { DtoBase } from "requestmodal/DtoBase";
import { App } from "src/entity/app.entity";
import { Role } from "src/entity/role.entity";

export class approleDTO extends DtoBase{
    constructor() {
        super();
    }
        id: number;


       approlename: string;
    
   
        adminname: string;
       

        rolename: string;
       

        rolepermission: string;
       
        app:App
    
        role:Role
 
       



      }