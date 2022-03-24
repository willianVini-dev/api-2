import { inject, injectable } from 'tsyringe';
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/appError';
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository';
import { Rental } from '../../infra/typeorm/entities/rental';
import { IRentalsRepository } from '../../repositories/IRentalsRepositorys';


interface IRequest{
  car_id:string;
  user_id:string;
  expected_return_date:Date;
}
@injectable()
class CreateRentalUseCase{

  constructor( 
    @inject("RentalsRepository")
    private rentalsRepository:IRentalsRepository,
    @inject("DayjsProvider")
    private dateProvider:IDateProvider,
    @inject("CarsRepository")
    private carsRepository:ICarsRepository){}

  async execute({car_id,user_id,expected_return_date}:IRequest):Promise<Rental>{
    const minHours:number = 24;
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)
    if(carUnavailable){
      throw new AppError("Car is unavailable")
    }

    const userUnavailable = await this.rentalsRepository.findByOpenRentalUser(user_id)
    if(userUnavailable){
      throw new AppError("User is unavailable")
    }

    const compare = this.dateProvider.compareInHours(expected_return_date,this.dateProvider.dateNow());
    console.log("🚀 ~ file: createRentalUseCase.ts ~ line 38 ~ CreateRentalUseCase ~ execute ~ compare", compare)
    
    if(compare < minHours){
      throw new AppError("Minimum duration time, 24 hours")
    }

    // create rental
    const rental =  await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

    await this.carsRepository.updateAvailable(car_id, false)

    return rental;


  }
}

export{CreateRentalUseCase}