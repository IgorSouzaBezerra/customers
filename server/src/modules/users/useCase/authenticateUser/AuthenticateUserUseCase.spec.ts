import { AppError } from "../../../../shared/errors/AppError";
import { BCryptHashProvider } from "../../providers/HashProvider/implementations/BCryptHashProvider";
import { UsersRepositoryMemory } from "../../repositories/memory/UsersRepositoryMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

describe("Authenticate User", () => {
  let usersRepository: UsersRepositoryMemory;
  let hashProvider: BCryptHashProvider;
  let createUserUseCase: CreateUserUseCase;
  let authenticateUserUseCase: AuthenticateUserUseCase;

  beforeAll(() => {
    usersRepository = new UsersRepositoryMemory();
    hashProvider = new BCryptHashProvider();
    createUserUseCase = new CreateUserUseCase(usersRepository, hashProvider);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      hashProvider
    );
  });

  it("should be able to authenticate user", async () => {
    const user = await createUserUseCase.execute({
      name: "Sophia Cortez",
      email: "uc@ja.rw",
      password: "123456",
    });

    const result = await authenticateUserUseCase.execute(user.email, "123456");

    expect(result).toHaveProperty("token");
    expect(result).toHaveProperty("user");
  });

  it("should not be able to authenticate the user if the password is incorrect", async () => {
    await expect(async () => {
      const user = await createUserUseCase.execute({
        name: "Dollie Harmon",
        email: "umeciwga@ujduvuv.ga",
        password: "123456",
      });

      await authenticateUserUseCase.execute(user.email, "error");
    }).rejects.toEqual(new AppError("Email or password incorrect!"));
  });

  it("should not be able to authenticate the user if the user doesn't exist", async () => {
    await expect(async () => {
      await authenticateUserUseCase.execute("fake@fake.com", "error");
    }).rejects.toEqual(new AppError("Email or password incorrect!"));
  });
});
