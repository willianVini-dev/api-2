interface ICreatUserDTO{
  name:string;
  password:string;
  email:string;
  drive_license:string;
}

interface IUsersRepository{
  create(data:ICreatUserDTO):Promise<void>
}

export { IUsersRepository,ICreatUserDTO}