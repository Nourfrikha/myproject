import {Request, Response} from 'express';
import { Person } from '../entity/Person';
import { ModelCrudService } from '../services/implementations/ModelCrudService';
import { IModelCrud } from '../services/interfaces/IModelCrud';
class AuthController {
    private service: IModelCrud<Person>;
    constructor()
    {
        this.service = new ModelCrudService<Person>(Person);
    }
    async login(request: Request, response: Response, next: Function)
    {
        if(request.method == 'GET')
        {
            response.render('auth/login.njk');
        }
        else
        {
            response.redirect('/');
        }

    }
}
