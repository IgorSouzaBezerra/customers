import { BaseRepository } from "../../../../../shared/repositories/BaseRepository";
import { IAdressesRepository } from "../../../repositories/IAdressesRepository";
import { Address } from "../entities/Address";

class AdressesRepository
  extends BaseRepository<Address>
  implements IAdressesRepository
{
  constructor() {
    super(Address);
  }

  public async FindByZipCode(zip_code: string): Promise<Address> {
    return this.repository.findOne({ zip_code });
  }
}

export { AdressesRepository };
