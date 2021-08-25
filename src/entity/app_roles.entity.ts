import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Admin } from "./admin.entity";
import { App } from "./app.entity";
import { Client } from "./client.entity";
import { Role } from "./role.entity";

@Entity('app_roles')
export class AppRoles {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true})
   approlename: string;

    @Column({ nullable: true})
    adminname: string;
   
    @Column({ nullable: true})
    rolename: string;
   
    @Column({ nullable: true})
    rolepermission: string;
   

    @ManyToOne(() => App, app => app.id,{onDelete: 'SET NULL'})
    app:App
    // @ManyToMany(() => Client, role => role.roles)
    // clients?: Client[]

    
    @ManyToOne(() => Role, role => role.id,{onDelete: 'SET NULL'})
    role:Role
    // @ManyToMany(() => Client, role => role.roles)
    // clients?: Client[]

   

} 