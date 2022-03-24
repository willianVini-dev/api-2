import {Router} from "express"
import { CreateRentalController } from "../../../../modules/rentals/useCases/createRental/createRentalController";
import { DevolutionRentalController } from "../../../../modules/rentals/useCases/devolutionRental/devolutionRentalController";
import { ListRentalUserByController } from "../../../../modules/rentals/useCases/listRentalByUser/listRentalByUserController";

import { routerAuthenticate } from "../middlewares/routerAuthenticate";

const rentalRoutes = Router();
const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController()
const listRentalByUserController = new ListRentalUserByController()

rentalRoutes.post("/", routerAuthenticate,createRentalController.handle)
rentalRoutes.post("/devolution/:id", routerAuthenticate,devolutionRentalController.handle)
rentalRoutes.get("/user", routerAuthenticate,listRentalByUserController.handle)
export {rentalRoutes}