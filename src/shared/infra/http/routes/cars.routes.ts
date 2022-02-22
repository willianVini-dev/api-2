import {Router} from "express"
import { CreateCarsController } from "../../../../modules/cars/useCases/createCars/createCarsController"
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/createCarSpecificationController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/listAvailableCarsController";
import { isAdmin } from "../middlewares/isAdmin";
import { routerAuthenticate } from "../middlewares/routerAuthenticate";
const carsRoutes = Router()

const createCarsController = new CreateCarsController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController()

carsRoutes.post("/", routerAuthenticate ,isAdmin, createCarsController.handle)

carsRoutes.post("/specification/:id", createCarSpecificationController.handle)

carsRoutes.get("/available", listAvailableCarsController.handle)

export {carsRoutes}