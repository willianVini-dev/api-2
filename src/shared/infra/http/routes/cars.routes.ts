import {Router} from "express"
import { CreateCarsController } from "../../../../modules/cars/useCases/createCars/createCarsController"

const carsRoutes = Router()

const createCarsController = new CreateCarsController();

carsRoutes.post("/", createCarsController.handle)

export {carsRoutes}