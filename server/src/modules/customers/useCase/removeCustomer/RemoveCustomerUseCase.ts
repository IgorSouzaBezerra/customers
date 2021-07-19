import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IAdressesRepository } from "../../repositories/IAdressesRepository";
import { ICustomersRepository } from "../../repositories/ICustomersRepository";

@injectable()
class RemoveCustomerUseCase {
  constructor(
    @inject("CustomersRepository")
    private readonly customersRepository: ICustomersRepository,
    @inject("AdressesRepository")
    private readonly adressesRepository: IAdressesRepository
  ) {}

  public async execute(customer_id: string): Promise<void> {
    const customer = await this.customersRepository.Get(customer_id);

    if (!customer) {
      throw new AppError("Customer does not exists!");
    }

    const address = await this.adressesRepository.Get(customer.address.id);

    await this.customersRepository.Delete(customer);
    await this.adressesRepository.Delete(address);
  }
}

export { RemoveCustomerUseCase };
