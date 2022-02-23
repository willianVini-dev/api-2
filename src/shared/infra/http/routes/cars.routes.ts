import {Router} from "express"
import multer from "multer";
import uploadConfig from "../../../../config/upload"
import { CreateCarsController } from "../../../../modules/cars/useCases/createCars/createCarsController"
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/createCarSpecificationController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/listAvailableCarsController";
import { UploadCarImageController } from "../../../../modules/cars/useCases/uploadCarImage/uploadCarImageController";
import { isAdmin } from "../middlewares/isAdmin";
import { routerAuthenticate } from "../middlewares/routerAuthenticate";
const carsRoutes = Router()


const uploadImageCars = multer(uploadConfig.upload("./tmp/cars"))
const createCarsController = new CreateCarsController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImageController = new UploadCarImageController()

carsRoutes.post("/", routerAuthenticate ,isAdmin, createCarsController.handle)

carsRoutes.post("/specification/:id", createCarSpecificationController.handle)

carsRoutes.get("/available", listAvailableCarsController.handle)

carsRoutes.post("/images/:id",
  routerAuthenticate, 
  isAdmin,uploadImageCars.array("images"),
  uploadCarImageController.handle 
)

export {carsRoutes}