import { Rental } from "../infra/typeorm/entities/rental"

interface ICreateRental{
  user_id:string;
  car_id:string;
  expected_return_date:Date
}

interface IRentalsRepository{
  findByOpenRentalUser(user_id:string):Promise<Rental>
  findOpenRentalByCar(car_id:string):Promise<Rental>
  create(data:ICreateRental):Promise<Rental>
}

export {IRentalsRepository,ICreateRental}