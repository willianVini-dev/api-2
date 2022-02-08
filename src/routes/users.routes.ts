import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { ListUserController } from "../modules/accounts/useCases/listUser/listUserController";
const userRoutes = Router();

const createUserControler = new CreateUserController();
const listUserControler = new ListUserController()

userRoutes.post("/", createUserControler.handle);
userRoutes.get("/", listUserControler.handle);

export {userRoutes}