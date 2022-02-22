import { Cars } from "../infra/typeorm/entities/Cars";
import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateCars{
  name :string;
  description:string;
  daily_rate:number;
  license_plate: string;
  fine_amount:number;
  brand: string;
  category_id:string;
  specification?:Specification[];
  id?:string;
}

interface ICarsRepository{
  create(data:ICreateCars):Promise<Cars>
  findByLicensesPlate(license_plate:string):Promise<Cars>
  findAvailable(brand?:string, category_id?:string,name?:string):Promise<Cars[]>
  findById(car_id:string):Promise<Cars>
}

export {ICreateCars, ICarsRepository}