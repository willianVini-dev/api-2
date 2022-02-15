import { Users } from "../../infra/typeorm/entities/User";
import { ICreatUserDTO, IUsersRepository } from "../IUserRepository";


class InMemoryUsersRepository implements IUsersRepository{
  users:Users[] = [];
  async create({ drive_license,name,email,password}: ICreatUserDTO): Promise<void> {
   
    const user = new Users();
    Object.assign(user,{drive_license,name,email,password});
    this.users.push(user);

  }
  async listAll(): Promise<Users[]> {
    return this.users
  }
  async findByEmail(email: string): Promise<Users> {
    return this.users.find( (user) => user.email === email)
  }
  async findById(id: string): Promise<Users> {
    return this.users.find( (user) => user.id === id )
  }

}

export {InMemoryUsersRepository}