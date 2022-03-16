import { Cars } from "../../infra/typeorm/entities/Cars";
import { ICarsRepository, ICreateCars } from "../ICarsRepository";

class InMemoryCarsRepository implements ICarsRepository{

  
  cars:Cars[] = [];
  
  async updateAvailable(id: string, available: boolean): Promise<void> {
    const updateCar = this.cars.findIndex( car => car.id === id )
    this.cars[updateCar].available = available;
  }
  async findAvailable(brand?:string, category_id?:string, name?:string): Promise<Cars[]> {
    const cars = this.cars
      .filter(car => {
        if(car.available === true ||
            ( 
              (brand && car.brand === brand) ||
              (category_id && car.category_id === category_id) ||
              (name && car.name === name)
            )
        ){
          return car;
        }
        return null;
      })

    return cars;
  }

  async create({name, description, daily_rate, license_plate, fine_amount, brand, category_id,id}: ICreateCars): Promise<Cars> {
    const car = new Cars();
    Object.assign(car,{
      name, 
      description, 
      daily_rate, 
      license_plate, 
      fine_amount, 
      brand, 
      category_id,
      id
    })

    this.cars.push(car);
    return car;
  }

  async findByLicensesPlate(license_plate):Promise<Cars>{
    return this.cars.find( car => car.license_plate === license_plate )
  }

  async findById(car_id:string):Promise<Cars>{
    return this.cars.find(car => car.id === car_id)
  }

}
export {InMemoryCarsRepository}