import { ICreateRental, IRentalsRepository } from "../../../repositories/IRentalsRepositorys";
import { Rental } from "../entities/rental";
import { Repository, getRepository } from 'typeorm';


class RentalRepository implements IRentalsRepository{

  private repository:Repository<Rental>
  constructor(){
    this.repository = getRepository(Rental)
  }

  async findRentalByUser(user_id: string): Promise<Rental[]> {
    return await this.repository.find({
      where:{user_id},
      relations:["car","user"]
    })
  }
  async findById(id: string): Promise<Rental> {
    return await this.repository.findOne(id)
  }
  async findByOpenRentalUser(user_id: string): Promise<Rental> {
    return await this.repository.findOne({
      where:{
        user_id,
        end_date:null
      }
    })
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return await this.repository.findOne({ 
      where:{
        car_id, 
        end_date:null
      }
    })
  }
  async create({car_id, expected_return_date, user_id, id, end_date,total}: ICreateRental): Promise<Rental> {
    const rental = await this.repository.create({car_id, expected_return_date, user_id, id, end_date,total})
    await this.repository.save(rental)
    return rental;
  }
  
}

export {RentalRepository}