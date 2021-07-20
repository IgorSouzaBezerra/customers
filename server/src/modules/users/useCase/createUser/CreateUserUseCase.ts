import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IHashProvider } from "../../providers/HashProvider/IHashProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,
    @inject("HashProvider")
    private readonly hashProvider: IHashProvider
  ) {}

  public async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    const userExists = await this.usersRepository.FindByEmail(email);

    if (userExists) {
      throw new AppError("User already exists!");
    }

    const passwordHashed = await this.hashProvider.generateHash(password);

    Object.assign(user, {
      name,
      email,
      password: passwordHashed,
    });

    const createdUser = await this.usersRepository.Create(user);

    return createdUser;
  }
}

export { CreateUserUseCase };
