import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Role } from "./role.entity";
import { Admin } from "./admin.entity";
@Entity('client')
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true})
    name: string;

    @Column({ nullable: true})
    adminname: string;

    // @Column({ nullable: true})
    // roleid: string;

    // @ManyToOne(type => Admin, admin => admin.name) admin: Admin[];  

    @ManyToMany(type => Role) @JoinTable() 
    classes: Role[];

    @ManyToOne(() => Role, role => role.id,{onDelete: 'SET NULL'})
    role:Role


    @ManyToOne(() => Admin, admin => admin.id,{onDelete: 'SET NULL'})
    admin:Admin




    // @ManyToOne(() => App, app => app.id,{onDelete: 'SET NULL'})
    // app:App
    // // @ManyToMany(() => Role, role => role.clients)
    // // @JoinTable()
    // // roles?: Role[]

} 