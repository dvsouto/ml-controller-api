import { Router } from "express";
import { UsersController } from "@controllers/users";


const usersRouter = (router: Router) => {
	const controller = new UsersController();

	router.get("/me", controller.me);
	router.get("/create-test", controller.createTestUser);

	return router;
};



export {
	usersRouter
};
