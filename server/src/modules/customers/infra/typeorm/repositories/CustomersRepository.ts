import { BaseRepository } from "../../../../../shared/repositories/BaseRepository";
import { ICustomersRepository } from "../../../repositories/ICustomersRepository";
import { Customer } from "../entities/Customer";

class CustomersRepository
  extends BaseRepository<Customer>
  implements ICustomersRepository
{
  constructor() {
    super(Customer);
  }

  public async FindByEmail(email: string): Promise<Customer> {
    return this.repository.findOne({ email });
  }

  public async FindByName(name: string): Promise<Customer> {
    return this.repository.findOne({ name });
  }
}

export { CustomersRepository };
