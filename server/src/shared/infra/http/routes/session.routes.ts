import { Router } from "express";

import { AuthenticateUserController } from "../../../../modules/users/useCase/authenticateUser/AuthenticateUserController";

const sessionRoutes = Router();

const authenticateUser = new AuthenticateUserController();

sessionRoutes.post("/", authenticateUser.handle);

export { sessionRoutes };
