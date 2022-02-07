import { Specification } from "../entities/Specification";

interface ICreateSpecificationDTO{
  name:string;
  description:string;
}

interface ISpeficationRepository{
  create({name, description}:ICreateSpecificationDTO):void;
  findByName(name:string):Specification;
}

export {ISpeficationRepository,ICreateSpecificationDTO}