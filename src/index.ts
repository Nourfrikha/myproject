import * as express from "express"
import * as bodyParser from "body-parser"
import * as nunjucks from "nunjucks";
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"

function injectGlobals (req, res, next) {
    var engine = res.app.get('engine');
    var config = req.app.get('config');

    engine.addGlobal('config', config);
    engine.addGlobal('request', req);
    next();
};

AppDataSource.initialize().then(async () => {
    
    // create express app
    const app = express()
    const nunjacksEngine = nunjucks.configure("views", {
        autoescape: true,
        express: app
    }).addFilter('json', JSON.stringify);
    app.use(bodyParser.json());
    app.set('engine', nunjacksEngine);
    app.use(injectGlobals);

    // register express routes from defined application routes
    Routes.forEach(route => {
        app[route.method](route.route, (req: Request, res: Response, next: Function) => {
            console.log(new route.controller);
            const result = (new (route.controller as any))[route.action](req, res, next);
            console.log(result);
            if (result instanceof Promise) {
                result.then((result) => result !== null && result !== undefined  ? res.send(result) : undefined)
            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        });
    });
    // setup express app here
    // ...

    // start express server
    app.listen(3000, function(error, event){
        console.log(error);
        console.log(event);
        console.log("server running");
    })


    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
