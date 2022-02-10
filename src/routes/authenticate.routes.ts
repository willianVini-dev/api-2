import { Router } from "express";
import { AuthenticaUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";
const authenticateRoutes = Router();

const authenticateUserController = new AuthenticaUserController()

authenticateRoutes.post("/sessions", authenticateUserController.handle)

export {authenticateRoutes}