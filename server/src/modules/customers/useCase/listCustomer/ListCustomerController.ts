import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCustomerUseCase } from "./ListCustomerUseCase";

class ListCustomerController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listCustomer = await container.resolve(ListCustomerUseCase);

    const customer = await listCustomer.execute(id);

    return response.json(customer);
  }
}

export { ListCustomerController };
