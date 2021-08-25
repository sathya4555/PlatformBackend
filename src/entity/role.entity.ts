import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import { Client } from "./client.entity";

@Entity('role')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true})
    rolename: string;

    @Column({ nullable: true})
    adminname: string;

    // @Column({ nullable: true, array: true },)
    // methodname: string[];

    @Column('text', { array: true ,nullable: true})
    public methodname: string[];

    // @ManyToMany(() => Client, role => role.roles)
    // clients?: Client[]

   

} 