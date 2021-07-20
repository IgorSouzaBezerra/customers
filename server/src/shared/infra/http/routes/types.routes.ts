import { Router } from "express";

import { ListTypePersonsController } from "../../../../modules/customers/useCase/listTypePersons/ListTypesPersonsController";

const typesRoutes = Router();

const typesController = new ListTypePersonsController();

typesRoutes.get("/", typesController.handle);

export { typesRoutes };
