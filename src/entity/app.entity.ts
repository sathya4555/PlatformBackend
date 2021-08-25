import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Client } from "./client.entity";
import { Feature } from "./features.entity";
import { Role } from "./role.entity";

@Entity('app')
export class App {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true})
    appname: string;

    @Column({ nullable: true})
    adminname: string;

    // @Column({ nullable: true, array: true },)
    // methodname: string[];
    @Column({ nullable: true})
    appdesciption: string;

   
  @OneToMany(() => Feature,feature=>feature.id)
  feature:Feature


     
  @OneToMany(() => Role,role=>role.id)
  role:Role

    // @ManyToMany(() => Client, role => role.roles)
    // clients?: Client[]

   

} 