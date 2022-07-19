import { Router } from "express";
import { AuthController } from "@controllers/auth";


const authRouter = (router: Router) => {
	const controller = new AuthController();

	router.get("/access-token", controller.getAccessToken);

	return router;
};



export {
	authRouter
};
