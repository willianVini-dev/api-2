import { UserToken } from "../infra/typeorm/entities/UserToken";

interface IUserCreateTokenDTO{
  user_id:string;
  expires_date:Date;
  refresh_token:string;
}


interface IUserTokenRepository{
  create({user_id, expires_date,refresh_token}:IUserCreateTokenDTO):Promise<UserToken>
  findByUserIdAndRefreshToken(user_id:string, token:string):Promise<UserToken>
  deleteById(id:string):Promise<void>
  findByRefreshToken(token:string):Promise<UserToken>
}

export{IUserTokenRepository,IUserCreateTokenDTO}