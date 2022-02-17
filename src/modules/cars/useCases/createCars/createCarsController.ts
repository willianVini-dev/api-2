import {Request, Response} from "express"
import {container} from "tsyringe"
import { CreateCarsUseCase } from "./createCarsUseCase"

class CreateCarsController {
  async handle(request:Request, response:Response):Promise<Response>{
    const {name, description, daily_rate, license_plate, fine_amount, brand, category_id} = request.body
    
    const createCarsUseCase = container.resolve(CreateCarsUseCase)
    const car = await createCarsUseCase.execute(
      {
        name, 
        description, 
        daily_rate, 
        license_plate, 
        fine_amount, 
        brand, 
        category_id
      }
    )
    return response.status(201).json(car)
  }
}

export {CreateCarsController}