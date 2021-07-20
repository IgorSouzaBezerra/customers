import { Router } from "express";

import { customerRoutes } from "./customers.routes";
import { typesRoutes } from "./types.routes";
import { vehiclesRoutes } from "./vehicles.routes";

const router = Router();

router.use("/customers", customerRoutes);
router.use("/types", typesRoutes);
router.use("/vehicles", vehiclesRoutes);

export { router };
