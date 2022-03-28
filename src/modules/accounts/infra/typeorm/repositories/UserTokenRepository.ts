import { getRepository } from 'typeorm';
import { Repository } from 'typeorm';
import { IUserTokenRepository, IUserCreateTokenDTO } from "../../../repositories/IUserTokenRepository";
import { UserToken } from "../entities/UserToken";


class UserTokenRepository implements IUserTokenRepository{
  
  private repository:Repository<UserToken>
  constructor(){
    this.repository = getRepository(UserToken)
  }
  async create({ user_id, expires_date, refresh_token }: IUserCreateTokenDTO): Promise<UserToken> {
    const userToken = await this.repository.create({
      user_id,
      expires_date,
      refresh_token
    })
    await this.repository.save(userToken)
    return userToken;
  }
  
}

export {UserTokenRepository}