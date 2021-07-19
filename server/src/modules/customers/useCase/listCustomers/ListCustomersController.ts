import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCustomersUseCase } from "./ListCustomersUseCase";

class ListCustomersCotroller {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;

    const listCustomers = container.resolve(ListCustomersUseCase);

    const customers = await listCustomers.execute(Number(page));

    return response.json(customers);
  }
}

export { ListCustomersCotroller };
