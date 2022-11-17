import { Router } from "express";
import { CategoriesController } from "@controllers/categories";


const categoriesRouter = (router: Router) => {
	const controller = new CategoriesController();

	router.get("/list", controller.list);
	router.get("/listAll", controller.listAll);
	router.get("/find", controller.find);
	router.get("/dump", controller.dump);

	return router;
};



export {
	categoriesRouter
};
