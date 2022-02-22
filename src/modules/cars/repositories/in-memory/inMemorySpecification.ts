import { Specification } from "../../infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";


class InMemorySpecification implements ISpecificationRepository{

  specification:Specification[] = [];
  
  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification()
    Object.assign(specification, {
      name,
      description
    });

    this.specification.push(specification)
    return specification
  }
  async findByName(name: string): Promise<Specification> {
    return this.specification.find( specification => specification.name === name);
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const AllSpecifications = this.specification.filter((specification) => 
    ids.includes(specification.id)
    );
    return AllSpecifications;
  }

  
}

export {InMemorySpecification}