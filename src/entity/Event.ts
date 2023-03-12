import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Person} from "./Person";
import {Ticket} from "./Ticket";

@Entity({name: 'events'})
export class Event {

    @PrimaryGeneratedColumn() id: number;
    @Column({type: 'text'}) title: string;
    @Column({type: 'text'}) description: string;
    @Column({type: 'text'}) image_path: string;
    @Column({type: 'date'}) dateStart: Date;
    @Column({type: 'date'}) dateEnd: Date;
    @OneToMany(() => Ticket, (ticket: Ticket) => ticket.event) tickets: Ticket[];
    @Column({type: 'text'}) address: string;
    @Column({type: 'float'}) hosting: number;
    @Column({type: "float"}) priceConference: number;
    @Column({type: 'float'}) priceTransporting: number;
}
