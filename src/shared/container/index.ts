import { container } from "tsyringe"
import {ICategoriesRepository} from "../../modules/cars/repositories/ICategoriesRepository"
import {CategoriesRepository} from "../../modules/cars/repositories/Implementations/CategoriesRepository"
// interface = ICategoriesRepository
// Nome pro registro
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
)