import { Router, Express } from "express";


export interface IServer {
  readonly app: Express,
  readonly route: Router,

  initialize: () => void,
  // middlewares: () => void,
  // routes: () => void,
  listen: () => Promise<boolean>,
}