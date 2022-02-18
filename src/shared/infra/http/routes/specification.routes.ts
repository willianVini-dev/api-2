import { Router } from "express";
import { routerAuthenticate } from "../middlewares/routerAuthenticate";
import {CreateSpecificationController} from "../../../../modules/cars/useCases/createSpecification/createSpecificationController"
import { isAdmin } from "../middlewares/isAdmin";
const createSpecificationController = new CreateSpecificationController()

const specificationRouter = Router();

specificationRouter.post("/",routerAuthenticate,isAdmin,createSpecificationController.handler);


// specificationRouter.get("/", (request, response )=>{

// });

export {specificationRouter}