import { Request, Response } from "express";
import { User } from "../models/userModel";
import { UserInterface } from "../types/UserInterface";
import { createResponse } from "../utils/response";
import { comparePasswords } from "../utils/hash";
import { createJWT } from "../utils/auth";

export const loginController = async (req: Request, res: Response) => {
  const user = req.body as UserInterface;

  const foundUser = await User.findOne({ email: user.email });

  if (!foundUser) {
    return res.status(401).json(createResponse('Invalid email or password.'))
  }

  const passwordMatches = await comparePasswords(user.password, foundUser.password);

  if (!passwordMatches) {
    return res.status(401).json(createResponse('Invalid email or password.'))
  }

  const jwt = createJWT(user.email)

  return res.status(200).json(createResponse(jwt))
}