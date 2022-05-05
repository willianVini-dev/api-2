import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import nodemailer, {Transporter} from "nodemailer"
import handlebars from "handlebars";
import fs from "fs"


@injectable()
class EtherealMailProvider implements IMailProvider{
  private client:Transporter

  constructor(){

    nodemailer.createTestAccount().then( account =>{
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth:{
          user: account.user,
          pass: account.pass
        },
        tls: {
          rejectUnauthorized: false
          }
      });

      this.client = transporter;

    }).catch( err => console.error(err))
  }

  async sendMail(to: string, subject: string, variables:any, path:string): Promise<void> {

    // lendo o o template com as variaveis
    const templateFileContent = fs.readFileSync(path).toString("utf-8")

    // mudando as variaveis do template
    const templateParse = handlebars.compile(templateFileContent)
    const templateHtml = templateParse(variables)


    const message = await this.client.sendMail({
      to,
      from: "Rentx <noreplay@rentex.com.br>",
      subject,
      html:templateHtml
    })

    console.log("message sent", message.messageId)
    console.log("preview url", nodemailer.getTestMessageUrl(message))
  }
  
}

export {EtherealMailProvider}