import { UserToken } from "../infra/typeorm/entities/UserToken";

interface IUserCreateTokenDTO{
  user_id:string;
  expires_date:Date;
  refresh_token:string;
}


interface IUserTokenRepository{
  create({user_id, expires_date,refresh_token}:IUserCreateTokenDTO):Promise<UserToken>
}

export{IUserTokenRepository,IUserCreateTokenDTO}