import { AppError } from '../../../../shared/errors/appError';
import { Rental } from '../../infra/typeorm/entities/rental';
import { IRentalsRepository } from '../../repositories/IRentalsRepositorys';
interface IRequest{
  car_id:string;
  user_id:string;
  expected_return_date:Date;
}

class CreateRentalUseCase{

  constructor( private rentalsRepository:IRentalsRepository){}

  async execute({car_id,user_id,expected_return_date}:IRequest):Promise<Rental>{

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)
    if(carUnavailable){
      throw new AppError("Car is unavailable")
    }

    const userUnavailable = await this.rentalsRepository.findByOpenRentalUser(user_id)
    if(userUnavailable){
      throw new AppError("User is unavailable")
    }

    return await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

  }
}

export{CreateRentalUseCase}