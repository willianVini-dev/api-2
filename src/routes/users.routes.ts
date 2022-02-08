import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
const userRoutes = Router();


const createUserControler = new CreateUserController();

userRoutes.post("/", createUserControler.handle);

export {userRoutes}