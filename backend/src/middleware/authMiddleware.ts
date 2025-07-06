import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: JwtPayload; 
}

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {

  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }
  

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    if (decoded.email === process.env.MASTER_ADMIN_EMAIL) {
      req.user = decoded; 
      next(); 
    } else {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Authentication error:", error.message); 
    } else {
      console.error("Non-standard error type:", error);
    }
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};

export default authMiddleware;
