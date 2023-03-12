import { IRestController, ITemplateController } from '../Structure';
import { Request, Response } from 'express';
import { Person } from "../entity/Person";
import { ModelCrudService } from '../services/implementations/ModelCrudService';
import { ObjectType } from '../data-source';
import { IModelCrud } from '../services/interfaces/IModelCrud';
import { hasUncaughtExceptionCaptureCallback } from 'process';


export class RestModelController<T> implements IRestController<T>
{
    private service: IModelCrud<T>;

    constructor(type)
    {
        this.service = new ModelCrudService<T>(type);
    }

    async list(request: Request, response: Response, next: Function): Promise<T[]> {
        return await this.service.findAll();
    }
    async retrieve(request: Request, response: Response, next: Function): Promise<T> {
        return await this.service.findById(request.params.id);
    }
    async create(request: Request, response: Response, next: Function): Promise<T> {
        return await this.service.create(request.body);
    }
    async delete(request: Request, response: Response, next: Function): Promise<void> {
        await this.service.delete(request.params.id);
    }
    update(request: Request, response: Response, next: Function): Promise<T> {
        throw new Error('Method not implemented.');
    }
}


export class ModelTemplate<T> implements ITemplateController<T>
{
    private service: IModelCrud<T>;
    private template: string;
    private readonly urlRedirect: string;
    constructor(template: string, type, urlRedirect: string)
    {
        this.template = template;
        this.service = new ModelCrudService<T>(type);
        this.urlRedirect = urlRedirect;
    }
    get(request: Request, response: Response, next: Function) {
        response.render(this.template, {instances: this.service.findAll()});
    }
    post(request: Request, response: Response, next: Function) {
        try {
            this.service.create(request.body);
            response.redirect(this.urlRedirect);
        }
        catch {
            request.flash("error",);
            response.redirect("")
        }
            response.json({message: {type: 'error', content: ''}})

    }
}

export class CreatePersonTemplate extends ModelTemplate<Person>
{
    constructor()
    {
        super("public/person-form.html", Person, '/persons');
    }
}


export class LoginTemplate
{
    async get(request: Request, response: Response, next: Function)
    {
        response.render('public/interfaces/login.njk');
    }

    async post(request: Request, response: Response, next: Function)
    {

    }
}

export class SignupTemplate
{
    private service: IModelCrud<Person>

    constructor()
    {
        this.service = new ModelCrudService<Person>(Person);
    }

    async get(request: Request, response: Response, next: Function)
    {
        response.render('public/interfaces/signup.njk')
    }
}
