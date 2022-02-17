import { ICarsRepository, ICreateCars } from "../../../repositories/ICarsRepository";
import { Cars } from "../entities/Cars";
import { Repository, getRepository } from 'typeorm';


class CarsRepository implements ICarsRepository{

  private repository: Repository<Cars>

  constructor(){
    this.repository = getRepository(Cars)
  }
  
  async create({name, description, daily_rate, license_plate, fine_amount, brand, category_id}: ICreateCars): Promise<Cars> {
    
    const car = this.repository.create(
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
    await this.repository.save(car)
    return car;

  }
  async findByLicensesPlate(license_plate: string): Promise<Cars> {
    const car = await this.repository.findOne({license_plate})
    return car;
  }

}

export{CarsRepository}