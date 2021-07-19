import { IBaseRepository } from "../../../shared/repositories/IBaseRepository";
import { TypePerson } from "../infra/typeorm/entities/TypePerson";

export type ITypePersonsRepository = IBaseRepository<TypePerson>;
