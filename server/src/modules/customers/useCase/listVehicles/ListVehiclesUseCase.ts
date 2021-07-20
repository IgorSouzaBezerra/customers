import { inject, injectable } from "tsyringe";

import { Vehicle } from "../../infra/typeorm/entities/Vehicle";
import { IVehiclesRepository } from "../../repositories/IVehiclesRepository";

@injectable()
class ListVehiclesUseCase {
  constructor(
    @inject("VehiclesRepository")
    private readonly vehiclesRepository: IVehiclesRepository
  ) {}

  public async execute(): Promise<Vehicle[]> {
    return this.vehiclesRepository.GetAll(0);
  }
}

export { ListVehiclesUseCase };
