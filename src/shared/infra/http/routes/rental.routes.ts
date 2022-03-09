import {Router} from "express"
import { CreateRentalController } from "../../../../modules/rentals/useCases/createRental/createRentalController";
import { isAdmin } from "../middlewares/isAdmin";
import { routerAuthenticate } from "../middlewares/routerAuthenticate";

const rentalRoutes = Router();
const createRentalController = new CreateRentalController();

rentalRoutes.post("/", routerAuthenticate,createRentalController.handle)

export {rentalRoutes}