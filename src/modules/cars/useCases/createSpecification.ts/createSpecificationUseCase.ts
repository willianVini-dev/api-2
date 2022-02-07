import { ISpeficationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest{
  name:string;
  description:string;
}

class CreateSpecificationUseCase{
  constructor(private specificationRepository:ISpeficationRepository){}
  execute({name, description}:IRequest):void{
    const nameExists = this.specificationRepository.findByName(name);

    if(nameExists){
      throw new Error("Specification Exists!")
    }
    
    this.specificationRepository.create({name, description})
  }
}

export { CreateSpecificationUseCase}