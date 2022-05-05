import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/appError";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { IUserTokenRepository } from "../../repositories/IUserTokenRepository";
import { v4 as uuidV4} from "uuid"
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";
import {resolve} from "path"

@injectable()
class SendForgotPasswordMailUseCase{
  constructor( 
    @inject("UserRepository") 
    private userRepository:IUsersRepository,
    @inject("UserTokenRepository")
    private userTokenRepository:IUserTokenRepository,
    @inject("DayjsProvider")
    private dateProvider:IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider:IMailProvider
  ){
    
  }
  async execute(email:string):Promise<void>{

    const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs")

    const user = await this.userRepository.findByEmail(email)
    if(!user){ throw new AppError("User does not exists")}

    const token = uuidV4()

    await this.userTokenRepository.create({
      user_id:user.id,
      refresh_token:token,
      expires_date: this.dateProvider.addHours(3)
    })

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    }

    await this.mailProvider.sendMail(
      email, 
      "Recuperação de Senha",
      variables,
      templatePath
      
    )
  }
}

export{SendForgotPasswordMailUseCase}