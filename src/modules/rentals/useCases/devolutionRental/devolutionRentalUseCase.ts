import { inject, injectable } from "tsyringe";
import { IRentalsRepository } from "../../repositories/IRentalsRepositorys";
import { AppError } from '../../../../shared/errors/appError';
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { Rental } from "../../infra/typeorm/entities/rental";

interface IRequest{
  id:string;
  user_id:string;
}

@injectable()

class DevolutionRentalUseCase{

  constructor(
    @inject("RentalsRepository")
    private rentalsRepository:IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository:ICarsRepository,
    @inject("DayjsProvider")
    private dateProvider:IDateProvider,
  ){}

  async execute({id,user_id}:IRequest):Promise<Rental>{

    const rental = await this.rentalsRepository.findById(id)
    if(!rental){ throw new AppError("rental does not exists") }

    const car = await this.carsRepository.findById(rental.car_id)

    // calculado quantas diarias 
    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );
    // diarias minina = 1
    if(daily <= 0){ daily = 1 }

    // calculando multa
    let delay = this.dateProvider.compareInDays(
      this.dateProvider.dateNow(),
      rental.expected_return_date
    );

    let total:number = 0;
    if(delay > 0){ const calculate_fine = delay * car.fine_amount; total = calculate_fine;}

    total += delay * car.daily_rate;
    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental)
    await this.carsRepository.updateAvailable(car.id, true)
    return rental;

  }

}
export{ DevolutionRentalUseCase }