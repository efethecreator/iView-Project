import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Request arayüzünü genişletiyoruz
interface AuthenticatedRequest extends Request {
  user?: JwtPayload; // 'user' özelliği ekliyoruz
}

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  console.log("deneme");
  // Cookie'den token'ı alıyoruz
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }
  console.log("deneme2");

  try {
    console.log("deneme3");
    // Token doğrulama
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    console.log(decoded);

    // E-posta ortam değişkeni ile eşleşiyor mu?
    if (decoded.email === process.env.MASTER_ADMIN_EMAIL) {
      console.log("deneme5");
      req.user = decoded; // Doğrulama başarılıysa kullanıcıyı isteğe ekliyoruz
      next(); // Middleware geçişi, kullanıcı doğrulandı
    } else {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    console.log("deneme6");
  } catch (error) {
    console.log("deneme7");
    if (error instanceof Error) {
      console.log("deneme8");
      console.error("Authentication error:", error.message); // Hata mesajını loglayın
    } else {
      console.error("Non-standard error type:", error);
    }
    console.log("deneme9");
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};

export default authMiddleware;
