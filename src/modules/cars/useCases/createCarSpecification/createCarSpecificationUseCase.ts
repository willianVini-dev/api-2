import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { AppError } from '../../../../shared/errors/appError';
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";
import { Cars } from "../../infra/typeorm/entities/Cars";

interface IRequest{
  car_id:string;
  specification_id:string[]
}

@injectable()
class CreateCarSpecificationUseCase{

  constructor(
    @inject("CarsRepository")
    private carsRepository:ICarsRepository,
    @inject("SpecificationRepository")
    private specificationRepository:ISpecificationRepository
  ){}

  async execute({car_id,specification_id}:IRequest):Promise<Cars>{
    const carExists = await this.carsRepository.findById(car_id)
    if(!carExists){ throw new AppError("car does not exists") }

    const specification = await this.specificationRepository.findByIds(specification_id);
    carExists.specification = specification;
    await this.carsRepository.create(carExists)
    return carExists;
  } 
}

export {CreateCarSpecificationUseCase}