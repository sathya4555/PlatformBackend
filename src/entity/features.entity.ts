import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Admin } from "./admin.entity";
import { App } from "./app.entity";
import { Client } from "./client.entity";

@Entity('feature')
export class Feature {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true})
    featurename: string;

    @Column({ nullable: true})
    adminname: string;

    // @Column({ nullable: true, array: true },)
    // methodname: string[];
    @Column({ nullable: true})
    featuredesciption: string;

   
    @ManyToOne(() => App, app => app.id,{onDelete: 'SET NULL'})
    app:App
    // appid: any;
    // @ManyToMany(() => Client, role => role.roles)
    // clients?: Client[]

   

} 