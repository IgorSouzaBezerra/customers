import { Request, Response } from "express";
import { container } from "tsyringe";

import { RemoveCustomerUseCase } from "./RemoveCustomerUseCase";

class RemoveCustomerController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const removeCustomer = container.resolve(RemoveCustomerUseCase);

    await removeCustomer.execute(id);

    return response.status(204).send();
  }
}

export { RemoveCustomerController };
