import { Router } from "express";

import { CreateUserController } from "../../../../modules/users/useCase/createUser/CreateUserController";

const userRoutes = Router();

const createUser = new CreateUserController();

userRoutes.post("/", createUser.handle);

export { userRoutes };
