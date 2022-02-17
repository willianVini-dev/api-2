import {Router} from 'express'
import { categoriesRoutes } from "./categories.routes";
import { specificationRouter } from "./specification.routes";
import { userRoutes } from './users.routes';
import { authenticateRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';
const router = Router();

router.use("/categories",categoriesRoutes);
router.use("/specification",specificationRouter);
router.use("/users",userRoutes);
router.use("/cars",carsRoutes);
router.use(authenticateRoutes);

export {router}