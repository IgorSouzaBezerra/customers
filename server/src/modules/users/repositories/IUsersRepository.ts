import { IBaseRepository } from "../../../shared/repositories/IBaseRepository";
import { User } from "../infra/typeorm/entities/User";

export interface IUsersRepository extends IBaseRepository<User> {
  FindByEmail(email: string): Promise<User>;
}
