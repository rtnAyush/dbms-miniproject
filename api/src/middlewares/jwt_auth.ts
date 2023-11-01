import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare module "express" {
  interface Request {
    user: string;
    token: string;
  }
}

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, user: any) => {
        if (err) {
          return res
            .status(400)
            .json({ msg: "Session timeout! Please Login again" });
        } else {
          req.user = user;
          req.token = token;
          next();
        }
      }
    );
  } else {
    return res.status(400).json({ msg: "unauthorized access" });
  }
};

export default checkAuth;
