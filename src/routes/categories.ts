import { Router } from "express";
import { CategoriesController } from "@controllers/categories";


const categoriesRouter = (router: Router) => {
	const controller = new CategoriesController();

	router.get("/list", controller.list);
	router.get("/listAll", controller.listAll);

	return router;
};



export {
	categoriesRouter
};
