import { container } from "tsyringe"
import {ICategoriesRepository} from "../../modules/cars/repositories/ICategoriesRepository"
import {CategoriesRepository} from "../../modules/cars/repositories/Implementations/CategoriesRepository"
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository"
import { SpecificationRepository } from "../../modules/cars/repositories/Implementations/SpecificationRepository"
// interface = ICategoriesRepository
// Nome pro registro
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository

);