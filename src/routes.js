import { Router } from "express";
import UsersController from "./controllers/UsersController";
import RepositoriesController from "./controllers/RepositoriesController";
import SessionsController from "./controllers/SessionsController";
import auth from "./middlewares/auth";

const routes = new Router();

routes.post("/sessions", SessionsController.create);

//middleware
routes.use(auth);

//Repositories
routes.get("/users/:user_id/repositories", RepositoriesController.index);
routes.post("/users/:user_id/repositories", RepositoriesController.create);
routes.delete("/users/:user_id:id/repositories", RepositoriesController.delete);

//Users
routes.get("/users/", UsersController.index);
routes.get("/users/:id", UsersController.show);
routes.post("/users/", UsersController.create);
routes.put("/users/:id", UsersController.update);
routes.delete("/users/:id", UsersController.delete);

export default routes;