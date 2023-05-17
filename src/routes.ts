import { Application, Request, Response } from "express";
import UserModel, { UserDTO } from "./models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authGuard } from "./middleware/auth";
import UserController from "./controller/user";
import { validate } from "./middleware/validation.handler";

const secret = "secret_key";
const options = { expiresIn: "12h" };

export default function routes(app: Application): void {
  /**
   * @openapi
   * '/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Create new user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/schemas/UserModel'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/schemas/UserModel'
   *      400:
   *        description: Bad request
   */
  app.post(
    "/api/v1/register",
    authGuard,
    validate(UserDTO),
    UserController.create
  );

  /**
   * @openapi
   * '/users':
   *  post:
   *     tags:
   *     - User
   *     summary: login new user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/schemas/UserModel'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/schemas/UserModel'
   *      400:
   *        description: Bad request
   */
  app.post("/api/v1/login", UserController.login);
}
