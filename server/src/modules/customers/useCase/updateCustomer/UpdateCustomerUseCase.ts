import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IUpdateCustomerDTO } from "../../dtos/IUpdateCustomerDTO";
import { Customer } from "../../infra/typeorm/entities/Customer";
import { ICustomersRepository } from "../../repositories/ICustomersRepository";

@injectable()
class UpdateCustomerUseCase {
  constructor(
    @inject("CustomersRepository")
    private readonly customersRepository: ICustomersRepository
  ) {}

  public async execute({
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
  }: IUpdateCustomerDTO): Promise<Customer> {
    const customerExist = await this.customersRepository.Get(id);

    if (!customerExist) {
      throw new AppError("Customer does not exists!");
    }

    const customerExistByName = await this.customersRepository.FindByName(name);

    if (customerExistByName && customerExist.name !== name) {
      throw new AppError("Customer already exists!");
    }

    const customerExistEmail = await this.customersRepository.FindByEmail(
      email
    );

    if (customerExistEmail && customerExist.email !== email) {
      throw new AppError("Customer already exists!");
    }

    Object.assign(customerExist, {
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

    const updatedCustomer = await this.customersRepository.Update(
      customerExist
    );

    return updatedCustomer;
  }
}

export { UpdateCustomerUseCase };
