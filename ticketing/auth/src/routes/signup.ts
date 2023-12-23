import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models/users";
import { RequestValidationError } from "../errors/request-validation-error";
import { BedRequestError } from "../errors/BedRequestError";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"), //middleware 1
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("password must between 4 and 20 characters"),
  ],
  validateRequest, //middleware 2

  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BedRequestError("email in use");
    }
    const user = User.build({ email, password });
    await user.save();
    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );
    //Store it on session object
    req.session = { jwt: userJwt };
    res.status(201).send(user);
  }
);

export { router as signupRouter };
