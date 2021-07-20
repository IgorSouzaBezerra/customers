import { IBaseRepository } from "../../../shared/repositories/IBaseRepository";
import { Address } from "../infra/typeorm/entities/Address";

export interface IAdressesRepository extends IBaseRepository<Address> {
  FindByZipCode(zip_code: string): Promise<Address>;
}
