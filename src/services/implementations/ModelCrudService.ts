import {ObjectType, AppDataSource} from "../../data-source";
import {EntityNotFoundError} from "typeorm";
import { IModelCrud } from "../interfaces/IModelCrud";

export class ModelCrudService<T> implements IModelCrud<T>
{
    private repository;
    private readonly type: ObjectType<T>;
    constructor(type) {
        this.type = type;
        this.repository = AppDataSource.getRepository(this.type);
    }
    create(instance: T): T {
        return this.repository.create(instance);
    }

    delete(id: number): void {
        this.repository.remove(this.findById(id));
    }

    findAll(): T[] {
        return this.repository.findAll();
    }

    update(instance: T, id: number): T {
        const saved = this.findById(id);
        for (const key of Object.keys(instance)) {
            if(instance[key] !== saved[key]) {
                saved[key] = instance[key];
            }
        }
        this.repository.save(saved);
        return saved;
    }

    findById(id: number): T {
        const instance =  this.repository.findOneBy({id});
        if(!instance)
        {
            throw  new EntityNotFoundError(this.type, "object of type '" + this.type + "' not found'");
        }
        return instance;
    }
}
