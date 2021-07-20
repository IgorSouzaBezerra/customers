import { inject, injectable } from "tsyringe";

import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class GetMeUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository
  ) {}

  public async execute(id: string): Promise<User> {
    const user = await this.usersRepository.Get(id);

    return user;
  }
}

export { GetMeUseCase };
