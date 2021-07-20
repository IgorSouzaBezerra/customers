import { IBaseRepository } from "../../../shared/repositories/IBaseRepository";
import { Customer } from "../infra/typeorm/entities/Customer";

export interface ICustomersRepository extends IBaseRepository<Customer> {
  FindByName(name: string): Promise<Customer>;
  FindByEmail(email: string): Promise<Customer>;
}
