import { Router } from "express";

import { ListTypePersonsController } from "../../../../modules/customers/useCase/listTypePersons/ListTypesPersonsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const typesRoutes = Router();

const typesController = new ListTypePersonsController();

typesRoutes.get("/", ensureAuthenticated, typesController.handle);

export { typesRoutes };
