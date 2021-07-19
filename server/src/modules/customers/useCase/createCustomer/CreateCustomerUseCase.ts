import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateCustomerDTO } from "../../dtos/ICreateCustomerDTO";
import { Address } from "../../infra/typeorm/entities/Address";
import { Customer } from "../../infra/typeorm/entities/Customer";
import { ICustomersRepository } from "../../repositories/ICustomersRepository";
import { IVehiclesRepository } from "../../repositories/IVehiclesRepository";

@injectable()
class CreateCustomerUseCase {
  constructor(
    @inject("CustomersRepository")
    private readonly customersRepository: ICustomersRepository,
    @inject("VehiclesRepository")
    private readonly vehiclesRepository: IVehiclesRepository
  ) {}

  public async execute({
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
  }: ICreateCustomerDTO): Promise<Customer> {
    const customerNameExists = await this.customersRepository.FindByName(name);

    if (customerNameExists) {
      throw new AppError("Customer already exists!");
    }

    const customerEmailExists = await this.customersRepository.FindByEmail(
      email
    );

    if (customerEmailExists) {
      throw new AppError("Customer already exists!");
    }

    const vehiclesEntity = await this.vehiclesRepository.FindByIds(vehicles);

    const customer = new Customer();
    const addressEntity = new Address();

    Object.assign(addressEntity, address);

    Object.assign(customer, {
      name,
      surname,
      email,
      cpf,
      phone,
      type,
      end_time,
      day_service,
      address: addressEntity,
      vehicles: vehiclesEntity,
    });

    const createdCustomer = await this.customersRepository.Create(customer);

    return createdCustomer;
  }
}

export { CreateCustomerUseCase };
