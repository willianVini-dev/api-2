import { Router } from "express";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { ListUserController } from "../../../../modules/accounts/useCases/listUser/ListUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import multer from 'multer';
import uploadConfig from "../../../../config/upload"
import {routerAuthenticate} from "../middlewares/routerAuthenticate"

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))

const createUserControler = new CreateUserController();
const listUserControler = new ListUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

userRoutes.post("/", createUserControler.handle);

userRoutes.get("/", listUserControler.handle);

userRoutes.patch(
  "/avatar",
  routerAuthenticate,
  uploadAvatar.single("avatar"), 
  updateUserAvatarController.handle
);

export {userRoutes}