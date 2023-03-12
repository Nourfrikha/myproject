import { Request, Response } from 'express';
export interface ITemplateController<T>
{
    get(request: Request, response: Response, next: Function): any;
    post(request: Request, response: Response, next: Function): any;
}

export interface IRestController<T>
{
    list(request: Request, response: Response, next: Function): Promise<T[]>;
    retrieve(request: Request, response: Response, next: Function): Promise<T>;
    delete(request: Request, response: Response, next: Function): Promise<void>;
    update(request: Request, response: Response, next: Function): Promise<T>;
}
