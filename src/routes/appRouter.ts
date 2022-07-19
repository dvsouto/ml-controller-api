import express from "express";

import { authRouter } from "./auth";
import { categoriesRouter } from "./categories";
import { productsRouter } from "./products";
import { usersRouter } from "./users";


const AppRouter = () => {
	const router = express.Router();

	router.get("/", (req, res) => res.json({ success: true, message: "API Online"}));
	router.use("/auth", authRouter(router));
	router.use("/categories", categoriesRouter(router));
	router.use("/products", productsRouter(router));
	router.use("/users", usersRouter(router));


	return router;
};

export {
	AppRouter,
};