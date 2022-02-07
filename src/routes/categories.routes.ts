import { Router } from 'express';
import multer from "multer"
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/createCategoryController';
import { ListCategoryController } from '../modules/cars/useCases/ListCategories/ListCategoryController';
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/importCategoryController';

const categoriesRoutes = Router();

const upload = multer({ dest: "./tmp" })
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoryController();


categoriesRoutes.post('/',createCategoryController.handle);

categoriesRoutes.get("/", listCategoryController.handle)

categoriesRoutes.post("/import", upload.single("file"),importCategoryController.handle)

export { categoriesRoutes }