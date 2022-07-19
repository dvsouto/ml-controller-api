import { Router } from "express";
import { ProductsController } from "@controllers/products";


const productsRouter = (router: Router) => {
	const controller = new ProductsController();

	router.get("/test", controller.test);

	return router;
};



export {
	productsRouter
};
