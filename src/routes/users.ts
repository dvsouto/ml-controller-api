import { Router } from "express";
import { UsersController } from "@controllers/users";


const usersRouter = (router: Router) => {
	const controller = new UsersController();

	router.get("/me", controller.me);

	return router;
};



export {
	usersRouter
};
