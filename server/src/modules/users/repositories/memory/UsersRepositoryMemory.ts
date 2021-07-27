import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryMemory implements IUsersRepository {
  users: User[] = [];

  async FindByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  async Create(entity: User): Promise<User> {
    this.users.push(entity);
    return entity;
  }

  async Update(entity: User): Promise<User> {
    let user = await this.Get(entity.id);

    user = entity;

    return user;
  }

  async Delete(entity: User): Promise<void> {
    const user = this.users.findIndex((user) => user.id === entity.id);
    this.users.splice(user, 1);
  }

  async Get(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  async GetAll(page: number): Promise<User[]> {
    return this.users;
  }
}

export { UsersRepositoryMemory };
