import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/createSpecification.ts";


const specificationRouter = Router();
specificationRouter.post("/",(request, response)=>{
  return createSpecificationController.handler(request, response);
});


// specificationRouter.get("/", (request, response )=>{

// });

export {specificationRouter}