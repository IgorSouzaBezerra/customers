import { Router } from "express";

import { customerRoutes } from "./customers.routes";
import { sessionRoutes } from "./session.routes";
import { typesRoutes } from "./types.routes";
import { userRoutes } from "./users.routes";
import { vehiclesRoutes } from "./vehicles.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/session", sessionRoutes);
router.use("/customers", customerRoutes);
router.use("/types", typesRoutes);
router.use("/vehicles", vehiclesRoutes);

export { router };
