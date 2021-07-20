import { Router } from "express";

import { CreateCustomerController } from "../../../../modules/customers/useCase/createCustomer/CreateCustomerController";
import { ListCustomerController } from "../../../../modules/customers/useCase/listCustomer/ListCustomerController";
import { ListCustomersCotroller } from "../../../../modules/customers/useCase/listCustomers/ListCustomersController";
import { RemoveCustomerController } from "../../../../modules/customers/useCase/removeCustomer/RemoveCustomerController";
import { UpdateCustomerController } from "../../../../modules/customers/useCase/updateCustomer/UpdateCustomerController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const customerRoutes = Router();

const createCustomerController = new CreateCustomerController();
const listCustomersController = new ListCustomersCotroller();
const listCustomerController = new ListCustomerController();
const removeCustomerController = new RemoveCustomerController();
const updateCustomerController = new UpdateCustomerController();

customerRoutes.post("/", ensureAuthenticated, createCustomerController.handle);
customerRoutes.get("/", ensureAuthenticated, listCustomersController.handle);
customerRoutes.get("/:id", ensureAuthenticated, listCustomerController.handle);
customerRoutes.delete(
  "/:id",
  ensureAuthenticated,
  removeCustomerController.handle
);
customerRoutes.put("/", ensureAuthenticated, updateCustomerController.handle);

export { customerRoutes };
