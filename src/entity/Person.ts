import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Event} from "./Event";
import {Ticket} from "./Ticket";

@Entity()
export class Person {

    @PrimaryGeneratedColumn() id: number;
    @Column({type: 'text'}) firstname: string;
    @Column({type: 'text'}) lastname: string;
    @Column({type: 'text'}) tel: string;
    @Column({type: 'text'}) namecompany: string;
    @Column({type: 'text'}) image: string;
    @Column({type: 'text'}) profession: string;
    @Column({type: 'text'}) description: string;
    @Column({type: 'text'}) role: string;
    @Column({type: "text"}) email: string;
    @Column({type: "text"}) username: string;
    @Column({type: "text"}) password: string;
    @ManyToMany(() => Ticket) tickets: Ticket[];
}
