import { container } from "tsyringe";

import { AdressesRepository } from "../../modules/customers/infra/typeorm/repositories/AdressesRepository";
import { CustomersRepository } from "../../modules/customers/infra/typeorm/repositories/CustomersRepository";
import { TypePersonRepository } from "../../modules/customers/infra/typeorm/repositories/TypePersonRepository";
import { VehicleRepository } from "../../modules/customers/infra/typeorm/repositories/VehicleRepository";
import { IAdressesRepository } from "../../modules/customers/repositories/IAdressesRepository";
import { ICustomersRepository } from "../../modules/customers/repositories/ICustomersRepository";
import { ITypePersonsRepository } from "../../modules/customers/repositories/ITypePersonsRepository";
import { IVehiclesRepository } from "../../modules/customers/repositories/IVehiclesRepository";

container.registerSingleton<ICustomersRepository>(
  "CustomersRepository",
  CustomersRepository
);

container.registerSingleton<IAdressesRepository>(
  "AdressesRepository",
  AdressesRepository
);

container.registerSingleton<ITypePersonsRepository>(
  "TypePersonsRepository",
  TypePersonRepository
);

container.registerSingleton<IVehiclesRepository>(
  "VehiclesRepository",
  VehicleRepository
);
