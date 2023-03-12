import { Person } from "../entity/Person"
import { ModelCrudService } from "../services/implementations/ModelCrudService"

const personService:IModelCrud<Person> = new ModelCrudService<Person>(Person);
test('test login', () => {
    return expect(personService.create({
        firstname: 'String ',
        lastname: 'String',
        email: 'String',
        tel: 'int',
        namecompany: 'String',
        username: 'String',
        password: 'String',
        id: 0,
        image: "",
        profession: "",
        description: "",
        role: "",
        tickets: []
    }));
});
