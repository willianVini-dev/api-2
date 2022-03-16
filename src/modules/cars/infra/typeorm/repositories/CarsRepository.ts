import { ICarsRepository, ICreateCars } from "../../../repositories/ICarsRepository";
import { Cars } from "../entities/Cars";
import { Repository, getRepository, createQueryBuilder } from 'typeorm';


class CarsRepository implements ICarsRepository{

  private repository: Repository<Cars>

  constructor(){
    this.repository = getRepository(Cars)
  }
  async updateAvailable(id: string, available:boolean): Promise<void> {
    
    // Update cars set available = "true" where id = :id
    await this.repository
    .createQueryBuilder()
    .update()
    .set({available})
    .where("id = :id")
    .setParameters({id})
    .execute()

  }
  
  async create({name, description, daily_rate, license_plate, fine_amount, brand, category_id, specification,id}: ICreateCars): Promise<Cars> {
    
    const car = this.repository.create(
      {
        name, 
        description, 
        daily_rate, 
        license_plate, 
        fine_amount, 
        brand, 
        category_id,
        specification,
        id
      }
    )
    await this.repository.save(car)
    return car;

  }
  async findByLicensesPlate(license_plate: string): Promise<Cars> {
    const car = await this.repository.findOne({license_plate})
    return car;
  }

  async findAvailable(brand?:string, category_id?:string,name?:string):Promise<Cars[]>{

    const carsQuery = await this.repository
    .createQueryBuilder("cars")
    .where("available = :available", {available:true})

      if(brand){
        carsQuery.andWhere("cars.brand = :brand", {brand})
      }
      
      if(name){
        carsQuery.andWhere("cars.name = :name", {name})
      }

      if(category_id){
        carsQuery.andWhere("cars.category_id = :category_id", {category_id})
      }

      const cars = await carsQuery.getMany()
      return cars
  }

  async findById(id:string):Promise<Cars>{
    return await this.repository.findOne(id)
  }

}

export{CarsRepository}