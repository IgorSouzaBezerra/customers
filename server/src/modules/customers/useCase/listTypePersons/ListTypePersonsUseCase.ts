import { inject, injectable } from "tsyringe";

import { TypePerson } from "../../infra/typeorm/entities/TypePerson";
import { ITypePersonsRepository } from "../../repositories/ITypePersonsRepository";

@injectable()
class ListTypePersonsUseCase {
  constructor(
    @inject("TypePersonsRepository")
    private readonly typePersonsRepository: ITypePersonsRepository
  ) {}

  public async execute(): Promise<TypePerson[]> {
    const types = await this.typePersonsRepository.GetAll(0);
    return types;
  }
}

export { ListTypePersonsUseCase };
