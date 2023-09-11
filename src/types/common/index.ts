import { Router } from "express";

export interface IRoutes {
  path?: string;
  router: Router;
}

export interface IObject {
  [key: string]: string | number | {};
}
