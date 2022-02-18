import {Router} from "express"
import { CreateCarsController } from "../../../../modules/cars/useCases/createCars/createCarsController"
import { isAdmin } from "../middlewares/isAdmin";
import { routerAuthenticate } from "../middlewares/routerAuthenticate";
const carsRoutes = Router()

const createCarsController = new CreateCarsController();

carsRoutes.post("/", routerAuthenticate ,isAdmin, createCarsController.handle)

export {carsRoutes}