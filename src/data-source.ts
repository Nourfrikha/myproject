import "reflect-metadata"
import { DataSource } from "typeorm"
import {Person} from "./entity/Person";
import {Event} from "./entity/Event";
import {Ticket} from "./entity/Ticket";

export const AppDataSource = new DataSource({
    type: "mysql",
    connectorPackage: "mysql2",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Mysql1996@+=",
    database: "mydata",
    synchronize: true,
    logging: false,
    entities: [Person, Event, Ticket],
    migrations: [],
    subscribers: [],
})
export type ObjectType<T> = { new (): T } | Function;
