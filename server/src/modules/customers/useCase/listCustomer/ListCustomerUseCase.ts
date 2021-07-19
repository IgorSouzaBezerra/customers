import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { Customer } from "../../infra/typeorm/entities/Customer";
import { ICustomersRepository } from "../../repositories/ICustomersRepository";

@injectable()
class ListCustomerUseCase {
  constructor(
    @inject("CustomersRepository")
    private readonly customersRepository: ICustomersRepository
  ) {}

  public async execute(customer_id: string): Promise<Customer> {
    const customer = await this.customersRepository.Get(customer_id);

    if (!customer) {
      throw new AppError("Customer does not exists!");
    }

    return customer;
  }
}

export { ListCustomerUseCase };
