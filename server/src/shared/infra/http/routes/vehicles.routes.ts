import { Router } from "express";

import { ListVehiclesController } from "../../../../modules/customers/useCase/listVehicles/ListVehiclesController";

const vehiclesRoutes = Router();

const listVehicles = new ListVehiclesController();

vehiclesRoutes.get("/", listVehicles.handle);

export { vehiclesRoutes };
