import { DtoBase } from "requestmodal/DtoBase";
import { Role } from "src/entity/role.entity";

export class appDTO extends DtoBase{
    constructor() {
        super();
       
      }
    id: number;


    appname: string;


    adminname: string;

    // @Column({ nullable: true, array: true },)
    // methodname: string[];

    appdesciption: string;


    // @ManyToMany(() => Client, role => role.roles)
    // clients?: Client[]

   

} 