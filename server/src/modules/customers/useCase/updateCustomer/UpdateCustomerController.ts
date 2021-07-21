import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateCustomerUseCase } from "./UpdateCustomerUseCase";

class UpdateCustomerController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const {
      id,
      name,
      surname,
      email,
      cpf,
      phone,
      active,
      end_time,
      day_service,
      type,
      address,
      vehicles,
    } = request.body;

    const updateCustomer = container.resolve(UpdateCustomerUseCase);

    const updatedCustomer = await updateCustomer.execute({
      id,
      name,
      surname,
      email,
      cpf,
      phone,
      active,
      type,
      end_time,
      day_service,
      address,
      vehicles,
    });

    return response.json(updatedCustomer);
  }
}

export { UpdateCustomerController };
