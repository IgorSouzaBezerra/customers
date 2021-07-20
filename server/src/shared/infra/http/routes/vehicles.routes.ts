import { Router } from "express";

import { ListVehiclesController } from "../../../../modules/customers/useCase/listVehicles/ListVehiclesController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const vehiclesRoutes = Router();

const listVehicles = new ListVehiclesController();

vehiclesRoutes.get("/", ensureAuthenticated, listVehicles.handle);

export { vehiclesRoutes };
