import { Cars } from "../infra/typeorm/entities/Cars";

interface ICreateCars{
  name :string;
  description:string;
  daily_rate:number;
  license_plate: string;
  fine_amount:number;
  brand: string;
  category_id:string;
}

interface ICarsRepository{
  create(data:ICreateCars):Promise<Cars>
  findByLicensesPlate(license_plate:string):Promise<Cars>
  findAvailable(brand?:string, category_id?:string,name?:string):Promise<Cars[]>
}

export {ICreateCars, ICarsRepository}