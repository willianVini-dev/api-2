import {Router} from "express"
import { CreateCarsController } from "../../../../modules/cars/useCases/createCars/createCarsController"
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/listAvailableCarsController";
import { isAdmin } from "../middlewares/isAdmin";
import { routerAuthenticate } from "../middlewares/routerAuthenticate";
const carsRoutes = Router()

const createCarsController = new CreateCarsController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post("/", routerAuthenticate ,isAdmin, createCarsController.handle)

carsRoutes.get("/available", listAvailableCarsController.handle)

export {carsRoutes}