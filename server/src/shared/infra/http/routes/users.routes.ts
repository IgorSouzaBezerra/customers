import { Router } from "express";

import { CreateUserController } from "../../../../modules/users/useCase/createUser/CreateUserController";
import { GetMeController } from "../../../../modules/users/useCase/getMe/GetMeController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRoutes = Router();

const createUser = new CreateUserController();
const getMe = new GetMeController();

userRoutes.post("/", createUser.handle);
userRoutes.get("/me", ensureAuthenticated, getMe.handle);

export { userRoutes };
