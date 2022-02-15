import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/appError';

interface IRequest{
  name:string;
  description:string;
}
@injectable()
class CreateSpecificationUseCase{
  
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository:ISpecificationRepository){}

  async execute({name, description}:IRequest):Promise<void>{
    const nameExists = await this.specificationRepository.findByName(name);

    if(nameExists){
      throw new AppError("Specification Exists!")
    }
    
    await this.specificationRepository.create({name, description})
  }
}

export { CreateSpecificationUseCase}