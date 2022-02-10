import { Router } from "express";
import { routerAuthenticate } from "../middlewares/routerAuthenticate";
import {CreateSpecificationController} from "../modules/cars/useCases/createSpecification/createSpecificationController"

const createSpecificationController = new CreateSpecificationController()

const specificationRouter = Router();
specificationRouter.use(routerAuthenticate)
specificationRouter.post("/",createSpecificationController.handler);


// specificationRouter.get("/", (request, response )=>{

// });

export {specificationRouter}