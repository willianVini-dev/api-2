import { Router } from "express";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { ListUserController } from "../../../../modules/accounts/useCases/listUser/ListUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import multer from 'multer';
import uploadConfig from "../../../../config/upload"
import {routerAuthenticate} from "../middlewares/routerAuthenticate"
import { CreateAdminController } from "../../../../modules/accounts/useCases/createAdmin/createAdminController";
import {authUserAdmin} from "../middlewares/authUserAdmin"

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))

const createUserControler = new CreateUserController();
const listUserControler = new ListUserController()
const updateUserAvatarController = new UpdateUserAvatarController()
const userAdminController = new CreateAdminController();

userRoutes.post("/", createUserControler.handle);

userRoutes.post("/admin/:token",authUserAdmin, userAdminController.handle);

userRoutes.get("/", listUserControler.handle);

userRoutes.patch("/avatar", routerAuthenticate, uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export {userRoutes}