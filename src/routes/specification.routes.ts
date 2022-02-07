import { Router } from "express";
import {CreateSpecificationController} from "../modules/cars/useCases/createSpecification/createSpecificationController"

const createSpecificationController = new CreateSpecificationController()

const specificationRouter = Router();
specificationRouter.post("/",createSpecificationController.handler);


// specificationRouter.get("/", (request, response )=>{

// });

export {specificationRouter}