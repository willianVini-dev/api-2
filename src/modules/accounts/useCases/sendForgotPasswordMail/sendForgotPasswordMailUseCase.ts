import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/appError";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { IUserTokenRepository } from "../../repositories/IUserTokenRepository";
import { v4 as uuidV4} from "uuid"
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

@injectable()
class SendForgotPasswordMailUseCase{
  constructor( 
    @inject("UserRepository") 
    private userRepository:IUsersRepository,
    @inject("UserTokenRepository")
    private userTokenRepository:IUserTokenRepository,
    @inject("DayjsProvider")
    private dateProvider:IDateProvider
  ){}
  async execute(email:string){

    const user = await this.userRepository.findByEmail(email)
    if(!user){ throw new AppError("User does not exists")}

    const token = uuidV4()

    await this.userTokenRepository.create({
      user_id:user.id,
      refresh_token:token,
      expires_date: this.dateProvider.addHours(3)
    })
  }
}

export{SendForgotPasswordMailUseCase}