import { Cars } from "../../infra/typeorm/entities/Cars";
import { ICarsRepository, ICreateCars } from "../ICarsRepository";

class inMemoryCarsRepository implements ICarsRepository{

  cars:Cars[] = [];

  async create({name, description, daily_rate, license_plate, fine_amount, brand, category_id}: ICreateCars): Promise<Cars> {
    const car = new Cars();
    Object.assign(car,{
      name, 
      description, 
      daily_rate, 
      license_plate, 
      fine_amount, 
      brand, 
      category_id
    })

    this.cars.push(car);
    return car;
  }

  async findByLicensesPlate(license_plate):Promise<Cars>{
    return this.cars.find( car => car.license_plate === license_plate )
  }

}
export {inMemoryCarsRepository}