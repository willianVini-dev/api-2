import { getRepository } from 'typeorm';
import { Repository } from 'typeorm';
import { IUserTokenRepository, IUserCreateTokenDTO } from "../../../repositories/IUserTokenRepository";
import { UserToken } from "../entities/UserToken";


class UserTokenRepository implements IUserTokenRepository{
  
  private repository:Repository<UserToken>
  constructor(){
    this.repository = getRepository(UserToken)
  }
  async findByRefreshToken(token: string): Promise<UserToken> {
    return await this.repository.findOne({refresh_token:token})
  }
  async deleteById(id: string):Promise<void> {
    await this.repository.delete(id)
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token:string): Promise<UserToken> {
    return this.repository.findOne({
      user_id,
      refresh_token
     })
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