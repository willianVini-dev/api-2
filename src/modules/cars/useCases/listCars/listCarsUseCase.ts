import { Cars } from "../../infra/typeorm/entities/Cars";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest{
  category_id?:string;
  brand?:string;
  name?:string;
}

class ListCarsUseCase{

  constructor( private carsRepository:ICarsRepository){}

  async execute({category_id, brand, name}:IRequest):Promise<Cars[]>{
    const cars = await this.carsRepository.findAvailable(brand, category_id, name);
    return cars;
  }
}

export {ListCarsUseCase}