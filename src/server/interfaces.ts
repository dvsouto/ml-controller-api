import { Router, Express } from "express";


export interface IServer {
  readonly app: Express,
  router: Router;

  initialize: () => void,
  // middlewares: () => void,
  // routes: () => void,
  listen: () => Promise<boolean>,
}