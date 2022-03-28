import "reflect-metadata"
import { container } from "tsyringe"
import "./providers/index"
import {ICategoriesRepository} from "../../modules/cars/repositories/ICategoriesRepository"
import {CategoriesRepository} from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository"
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository"
import { SpecificationRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationRepository"
import { IUsersRepository } from "../../modules/accounts/repositories/IUserRepository"
import { UserRepository } from "../../modules/accounts/infra/typeorm/repositories/UserRepository"
import { ICarsRepository } from "../../modules/cars/repositories/ICarsRepository"
import { CarsRepository } from "../../modules/cars/infra/typeorm/repositories/CarsRepository"
import { ICarsImageRepository } from "../../modules/cars/repositories/ICarsImageRepository"
import { CarsImageRepository } from "../../modules/cars/infra/typeorm/repositories/CarsImageRepository"
import { IRentalsRepository } from "../../modules/rentals/repositories/IRentalsRepositorys"
import { RentalRepository } from "../../modules/rentals/infra/typeorm/repositories/RentalRepository"
import { IUserTokenRepository } from "../../modules/accounts/repositories/IUserTokenRepository"
import { UserTokenRepository } from "../../modules/accounts/infra/typeorm/repositories/UserTokenRepository"
import { IDateProvider } from "./providers/DateProvider/IDateProvider"
import { DayjsDateProvider } from "./providers/DateProvider/implementations/dayjsDateProvider"
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

container.registerSingleton<IUsersRepository>(
  "UserRepository",
  UserRepository
)

container.registerSingleton<ICarsRepository>(
  "CarsRepository",
  CarsRepository
)

container.registerSingleton<ICarsImageRepository>(
  "CarsImageRepository",
  CarsImageRepository
)

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalRepository
)

container.registerSingleton<IUserTokenRepository>(
  "UserTokenRepository",
  UserTokenRepository
)

container.registerSingleton<IDateProvider>(
  "DayjsProvider",
  DayjsDateProvider
)