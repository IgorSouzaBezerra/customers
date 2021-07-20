import { BaseRepository } from "../../../../../shared/repositories/BaseRepository";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository extends BaseRepository<User> implements IUsersRepository {
  constructor() {
    super(User);
  }

  public async FindByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }
}

export { UsersRepository };
