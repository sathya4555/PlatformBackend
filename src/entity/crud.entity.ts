import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('crud')
export class Crud {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true})
    methodname: string;

    @Column({ nullable: true})
    methodnumber: number;

    

} 