import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/appError';
import { Rental } from '../../infra/typeorm/entities/rental';
import { IRentalsRepository } from '../../repositories/IRentalsRepositorys';


@injectable()
class ListRentalByUserUseCase{

  constructor(@inject("RentalsRepository") private rentalsRepository:IRentalsRepository ){}

  async execute(user_id:string):Promise<Rental[]>{
    const rentals  = await this.rentalsRepository.findRentalByUser(user_id)
    if(!rentals){ throw new AppError("Not exists rental for user") }
    return rentals
  }
}

export{ListRentalByUserUseCase}