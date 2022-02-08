import { Users } from "../entities/User";

interface ICreatUserDTO{
  name:string;
  password:string;
  email:string;
  drive_license:string;
}

interface IUsersRepository{
  create(data:ICreatUserDTO):Promise<void>
  listAll():Promise<Users[]>
}

export { IUsersRepository,ICreatUserDTO}