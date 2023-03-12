import { Request, Response } from 'express';
import { IRestController, ITemplateController } from './Structure';
import { ObjectType } from './data-source';
import { LoginTemplate, SignupTemplate } from './controller/ModelCrudController';

interface IRoute
{
    route: string;
    method: string;
    controller: any;
    action: string;
}

export const Routes: IRoute[] = [
    {
        controller: LoginTemplate,
        action: 'login',
        method: 'get',
        route: '/login'
    },
    {
        controller: SignupTemplate,
        action: 'signup',
        method: 'get',
        route: '/signup'
    },
];
