import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCustomerUseCase } from "./CreateCustomerUseCase";

class CreateCustomerController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      surname,
      email,
      cpf,
      phone,
      type,
      end_time,
      day_service,
      address,
      vehicles,
    } = request.body;

    const createCustomer = container.resolve(CreateCustomerUseCase);

    const customer = await createCustomer.execute({
      name,
      surname,
      email,
      cpf,
      phone,
      type,
      end_time,
      day_service,
      address,
      vehicles,
    });

    return response.status(201).send(customer);
  }
}

export { CreateCustomerController };
