import { Specification } from '../entities/Specification'
import {ISpecificationRepository,ICreateSpecificationDTO} from '../../../repositories/ISpecificationRepository'
import { Repository, getRepository } from 'typeorm';


// singleton, instanciar o repositorio somente uma vez
class SpecificationRepository implements ISpecificationRepository{

  private repository:Repository<Specification>

  constructor(){ this.repository = getRepository(Specification) }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return await this.repository.findByIds(ids);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification>{
    const specification = this.repository.create({name, description});
    await this.repository.save(specification)
    return specification;
  }

  async findByName(name: string):Promise<Specification> {
    return await this.repository.findOne({name})
    
  }

}

export {SpecificationRepository}