import { inject } from "tsyringe";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { AppError } from '../../../../shared/errors/appError';

interface IRequest{
  car_id:string;
  specification_id:string[]
}

class CreateCarSpecificationUseCase{

  constructor(
    @inject("CarsRepository")
    private carsRepository:ICarsRepository
  ){}

  async execute({car_id,specification_id}:IRequest):Promise<void>{
    const carExists = await this.carsRepository.findById(car_id)

    if(!carExists){
      throw new AppError("car does not exists")
    }
  } 
}

export {CreateCarSpecificationUseCase}