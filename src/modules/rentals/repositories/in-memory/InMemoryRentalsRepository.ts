import { Rental } from "../../infra/typeorm/entities/rental";
import { ICreateRental, IRentalsRepository } from "../IRentalsRepositorys";


class InMemoryRentalsRepository implements IRentalsRepository{

  rentals:Rental[] = [];

  async findById(id: string): Promise<Rental> {
   return this.rentals.find( rental => rental.id === id)
  }

  async findRentalByUser(user_id: string): Promise<Rental[]> {
   return this.rentals.filter( rental => rental.user_id === user_id)
  }
  
  
  async create({ user_id, car_id, expected_return_date }: ICreateRental): Promise<Rental> {
    
    const rental = new Rental()
    Object.assign(rental,{
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date()
    });

    this.rentals.push(rental)
    return rental;
  }
  
  async findByOpenRentalUser(user_id: string): Promise<Rental> {

    return this.rentals
           .find(rental => rental.user_id === user_id && !rental.end_date)

  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {

    return this.rentals
           .find(rental => rental.car_id === car_id && !rental.end_date)
           
  }
  
}

export {InMemoryRentalsRepository}