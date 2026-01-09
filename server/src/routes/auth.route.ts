import { authCallbackController } from "@src/controllers/auth/callback.controller";
import { githubAuthController } from "@src/controllers/auth/githubAuth.controller";
import { googleAuthController } from "@src/controllers/auth/googleAuth.controller";
import { loginController } from "@src/controllers/auth/login.controller";
import { signupController } from "@src/controllers/auth/signup.controller";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", loginController);
authRouter.post("/signup", signupController);
authRouter.get("/callback", authCallbackController);
authRouter.get("/google", googleAuthController); 
authRouter.get("/github", githubAuthController);
export { authRouter };
