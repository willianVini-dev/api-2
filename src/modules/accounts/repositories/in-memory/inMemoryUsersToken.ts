import { UserToken } from "../../infra/typeorm/entities/UserToken";
import { IUserCreateTokenDTO, IUserTokenRepository } from "../IUserTokenRepository";

class InMemoryUsersToken implements IUserTokenRepository{

  usersToken:UserToken[] = [];
  
  async create({ user_id, expires_date, refresh_token }: IUserCreateTokenDTO): Promise<UserToken> {
   const userToken = new UserToken()
   Object.assign(userToken,{
     refresh_token,
     expires_date,
     user_id
   })
   this.usersToken.push(userToken)
   return userToken;
  }

  async findByUserIdAndRefreshToken(user_id: string, token: string): Promise<UserToken> {
    const userToken = this.usersToken.find(
      (ut) => ut.user_id === user_id && ut.refresh_token === token
    )
    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersToken.find( ut => ut.id === id)
    this.usersToken.splice(this.usersToken.indexOf(userToken,1))
  }

  async findByRefreshToken(token: string): Promise<UserToken> {
    const userToken = this.usersToken.find(
      (ut) => ut.refresh_token === token
    )
    return userToken;
  }

}

export {InMemoryUsersToken}