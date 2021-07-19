import { BaseRepository } from "../../../../../shared/repositories/BaseRepository";
import { IVehiclesRepository } from "../../../repositories/IVehiclesRepository";
import { Vehicle } from "../entities/Vehicle";

class VehicleRepository
  extends BaseRepository<Vehicle>
  implements IVehiclesRepository
{
  constructor() {
    super(Vehicle);
  }

  FindByIds(ids: string[]): Promise<Vehicle[]> {
    return this.repository.findByIds(ids);
  }
}

export { VehicleRepository };
