
import { InMemoryUsersRepository } from "../../repositories/in-memory/inMemoryUsersRepository";
import { ICreatUserDTO } from "../../repositories/IUserRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUserCase } from "./AuthenticateUserUseCase"
import { AppError } from '../../../../shared/errors/appError';
import { IUserTokenRepository } from "../../repositories/IUserTokenRepository";
import { InMemoryUsersToken } from "../../repositories/in-memory/inMemoryUsersToken";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/dayjsDateProvider";


let authenticateUserUseCase:AuthenticateUserUserCase;
let createUserUseCase:CreateUserUseCase;
let inMemoryUsersRepository:InMemoryUsersRepository;
let inMemoryUserToken:IUserTokenRepository;
let dayjsProvider:DayjsDateProvider;

describe("Authenticate User", ()=>{

  beforeEach(()=>{
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUserToken  = new InMemoryUsersToken()
    dayjsProvider = new DayjsDateProvider()
    authenticateUserUseCase = new AuthenticateUserUserCase(
      inMemoryUsersRepository,
      inMemoryUserToken,
      dayjsProvider
    );
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it("shoul be able to athenticate an user", async ()=>{

    const user:ICreatUserDTO = {
      drive_license: "1234567890",
      name: "teste",
      email: "teste@hotmail.com",
      password: "123456789"
    }

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty("token")

  });

  it("should not be able to authenticate an no existent user", async ()=>{
    await expect( authenticateUserUseCase.execute({
        email:'dfdd',
        password: 'dssds'
      })
    ).rejects.toEqual(new AppError("Email or password incorret!"))
  });

  it("shoul not be ablw to authenticate with incorret password", async ()=>{

    const user:ICreatUserDTO = {
      drive_license: "1234567890",
      name: "teste",
      email: "teste@hotmail.com",
      password: "123456789"
    }
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorret'
      })
    ).rejects.toEqual(new AppError("Email or password incorret!"))
  })

})