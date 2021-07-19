import { BaseRepository } from "../../../../../shared/repositories/BaseRepository";
import { TypePerson } from "../entities/TypePerson";

class TypePersonRepository extends BaseRepository<TypePerson> {
  constructor() {
    super(TypePerson);
  }
}

export { TypePersonRepository };
