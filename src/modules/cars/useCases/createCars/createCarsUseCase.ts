import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { AppError } from '../../../../shared/errors/appError';
import { Cars } from "../../infra/typeorm/entities/Cars";

interface IRequest{
  name :string;
  description:string;
  daily_rate:number;
  license_plate: string;
  fine_amount:number;
  brand: string;
  category_id:string;
}

@injectable()
class CreateCarsUseCase{

  constructor(
    @inject("CarsRepository")
    private carsRepository:ICarsRepository){}

  async execute({name, description, daily_rate, license_plate, fine_amount, brand, category_id}:IRequest):Promise<Cars>{
    
    const carsExists = await this.carsRepository.findByLicensesPlate(license_plate);

    if(carsExists){
      throw new AppError("Car already exists")
    }

    const car = await this.carsRepository.create(
      {
        name, 
        description, 
        daily_rate, 
        license_plate, 
        fine_amount, 
        brand, 
        category_id
      }
    );
    return car;
  }
}
export{CreateCarsUseCase}