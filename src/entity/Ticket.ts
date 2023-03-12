import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Person} from "./Person";
import {Event} from "./Event";

@Entity({name: 'tickets'})
export class Ticket
{
    @PrimaryGeneratedColumn({type: 'integer'}) id: number;
    @Column({type: 'text'}) type: string;
    @Column({type: 'float'}) price: number;
    @ManyToOne(() => Person, (person) => person.tickets) person: Person;
    @ManyToOne(() => Event, (event) => event.tickets) event: Event;
    @Column({type: 'text'}) qrCode: string;
}
