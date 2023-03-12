export interface IModelCrud<T>
{
    findAll(): T[];

    create(instance: T): T;

    update(person: T, id: number): T;

    delete(id: number): void;
    findById(id: number): T;
}
