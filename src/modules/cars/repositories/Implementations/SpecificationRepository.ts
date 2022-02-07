import { Specification } from '../../entities/Specification'
import {ISpeficationRepository,ICreateSpecificationDTO} from '../ISpecificationRepository'


// singleton, instanciar o repositorio somente uma vez
class SpecificationRepository implements ISpeficationRepository{
  private specification:Specification[];
  private static INSTANCE:SpecificationRepository;
  private constructor(){
    this.specification = []
  }
  public static getInstance(){
    if(!SpecificationRepository.INSTANCE){
      SpecificationRepository.INSTANCE = new SpecificationRepository();
    }
    return SpecificationRepository.INSTANCE;
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    
    const specification = new Specification();
    Object.assign(specification,{
      name,
      description,
      created_at: new Date()
    })
    this.specification.push(specification)
    
  }

  findByName(name: string):Specification {
    const nameExists = this.specification.find(specification => specification.name === name)
    return nameExists;
  }

}

export {SpecificationRepository}