import { Router } from "express";
import { AuthenticaUserController } from "../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "../../../../modules/accounts/useCases/refreshToken/refreshTokenController";
const authenticateRoutes = Router();

const authenticateUserController = new AuthenticaUserController()
const refreshTokenController = new RefreshTokenController()

authenticateRoutes.post("/sessions", authenticateUserController.handle)
authenticateRoutes.post("/refresh-token", refreshTokenController.handle)

export {authenticateRoutes}