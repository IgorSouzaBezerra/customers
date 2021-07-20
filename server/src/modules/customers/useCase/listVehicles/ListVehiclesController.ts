import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListVehiclesUseCase } from "./ListVehiclesUseCase";

class ListVehiclesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listVehicles = container.resolve(ListVehiclesUseCase);

    const vehicles = await listVehicles.execute();

    return response.json(vehicles);
  }
}

export { ListVehiclesController };
