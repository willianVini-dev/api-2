import { Users } from "../infra/typeorm/entities/User";

interface ICreatUserDTO{
  name:string;
  password:string;
  email:string;
  drive_license:string;
  id?:string;
  avatar?:string;
}

interface IUsersRepository{
  create(data:ICreatUserDTO):Promise<void>
  listAll():Promise<Users[]>
  findByEmail(email:string):Promise<Users>
  findById(id:string):Promise<Users>
  createAdmin(password:string):Promise<void>
}

export { IUsersRepository,ICreatUserDTO}