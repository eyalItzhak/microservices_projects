import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayLoad {
  id: string;
  email: string;
}

//override default express interface definition and add props
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayLoad;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get payload if login
  if (!req.session?.jwt) {
    return next(); // go to the next middleware or continue to routs
  }
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayLoad;
    req.currentUser = payload;
  } catch (err) {}
  next();
};
