import { Router } from 'express';
import multer from "multer"
import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/createCategoryController';
import { ListCategoryController } from '../../../../modules/cars/useCases/ListCategories/ListCategoryController';
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCategory/importCategoryController';
import { routerAuthenticate } from '../middlewares/routerAuthenticate';
import { isAdmin } from '../middlewares/isAdmin';

const categoriesRoutes = Router();

const upload = multer({ dest: "./tmp" })
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoryController();


categoriesRoutes.post('/',routerAuthenticate,isAdmin,createCategoryController.handle);

categoriesRoutes.get("/", listCategoryController.handle)

categoriesRoutes.post("/import",routerAuthenticate,isAdmin, upload.single("file"),importCategoryController.handle)

export { categoriesRoutes }