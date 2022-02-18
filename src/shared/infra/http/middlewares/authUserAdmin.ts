import{ Request, Response, NextFunction} from "express"

export async function authUserAdmin(request:Request, response:Response, next:NextFunction){
  console.log(request.params)
  next()
}
