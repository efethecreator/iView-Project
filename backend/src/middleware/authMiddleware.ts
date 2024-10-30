import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Request arayüzünü genişletiyoruz
interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;  // 'user' özelliği ekliyoruz
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): Response | void => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Giriş yapılmamış!' });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err: Error | null, decoded: string | JwtPayload | undefined) => {
    if (err) {
      return res.status(403).json({ message: 'Geçersiz token!' });
    }
    req.user = decoded; // 'req.user' içine decoded verisini atıyoruz
    next();
  });
};

export default authMiddleware;