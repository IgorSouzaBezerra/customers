import { inject, injectable } from "tsyringe";

import { Customer } from "../../infra/typeorm/entities/Customer";
import { ICustomersRepository } from "../../repositories/ICustomersRepository";

@injectable()
class ListCustomersUseCase {
  constructor(
    @inject("CustomersRepository")
    private readonly customersRepository: ICustomersRepository
  ) {}

  public async execute(page: number): Promise<Customer[]> {
    const customers = await this.customersRepository.GetAll(page);

    return customers;
  }
}

export { ListCustomersUseCase };
