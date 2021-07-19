import { IBaseRepository } from "../../../shared/repositories/IBaseRepository";
import { Vehicle } from "../infra/typeorm/entities/Vehicle";

export interface IVehiclesRepository extends IBaseRepository<Vehicle> {
  FindByIds(ids: string[]): Promise<Vehicle[]>;
}
