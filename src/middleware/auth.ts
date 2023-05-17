import { Request, Response } from "express";
import UserModel from "../models/userModel";

import jwt from "jsonwebtoken";

export const authGuard = async (req: Request, res: Response, next: any) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }
  const rawToken = token.split(" ")[1];
  try {
    const decoded: any = jwt.verify(rawToken, "secret_key");
    const user = await UserModel.findOne({ _id: decoded.id });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Access Denied" });
  }
};
