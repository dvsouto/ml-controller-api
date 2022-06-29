/**
 * Application entry point
 * 
 * @author Davi Souto
 * @since 29/06/2022
 */

import express, { Router, Request, Response } from "express";

const app = express();
 
const route = Router();
 
app.use(express.json());
 
route.get("/", (req: Request, res: Response) => {
	res.json({ message: "hello world with Typescript" });
});
 
app.use(route);
 
 
app.listen(3333, () => console.log("Server running on port 3333"));