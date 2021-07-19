import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListTypePersonsUseCase } from "./ListTypePersonsUseCase";

class ListTypePersonsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listTypes = container.resolve(ListTypePersonsUseCase);

    const types = await listTypes.execute();

    return response.json(types);
  }
}

export { ListTypePersonsController };
