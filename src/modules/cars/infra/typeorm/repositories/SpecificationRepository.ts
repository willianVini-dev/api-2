import { Specification } from '../entities/Specification'
import {ISpecificationRepository,ICreateSpecificationDTO} from '../../../repositories/ISpecificationRepository'
import { Repository, getRepository } from 'typeorm';


// singleton, instanciar o repositorio somente uma vez
class SpecificationRepository implements ISpecificationRepository{

  private repository:Repository<Specification>

  private constructor(){
    this.repository = getRepository(Specification)
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({name, description});
    await this.repository.save(specification)
  }

  async findByName(name: string):Promise<Specification> {
    const nameExists = this.repository.findOne({name})
    return nameExists;
  }

}

export {SpecificationRepository}