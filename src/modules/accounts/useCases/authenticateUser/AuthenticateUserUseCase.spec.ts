
import { InMemoryUsersRepository } from "../../repositories/in-memory/inMemoryUsersRepository";
import { ICreatUserDTO } from "../../repositories/IUserRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUserCase } from "./AuthenticateUserUseCase"
import { AppError } from '../../../../shared/errors/appError';

let authenticateUserUseCase:AuthenticateUserUserCase;
let inMemoryUsersRepository:InMemoryUsersRepository;
let createUserUseCase:CreateUserUseCase;

describe("Authenticate User", ()=>{

  beforeEach(()=>{
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUserCase(inMemoryUsersRepository);
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
    expect( async ()=>{

      await authenticateUserUseCase.execute({
        email:'dfdd',
        password: 'dssds'
      });

    }).rejects.toBeInstanceOf(AppError)
  });

  it("shoul not be ablw to authenticate with incorret password", async ()=>{

    expect(async()=>{
      const user:ICreatUserDTO = {
        drive_license: "1234567890",
        name: "teste",
        email: "teste@hotmail.com",
        password: "123456789"
      }
  
      await createUserUseCase.execute(user);
  
      const result = await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorret'
      });
    }).rejects.toBeInstanceOf(AppError)
  })

})