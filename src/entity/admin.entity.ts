import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Client } from "./client.entity";
@Entity('admin')
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true})
    name: string;

    @Column({ nullable: true})
    password: string;

    
  // //  @ManyToOne(type => Client, c => c.id) c: Client; 
  //   @OneToMany(type => Client, project => project.name) projects: Client[];  



  @OneToMany(() => Client,client=>client.admin)
  client:Client

} 