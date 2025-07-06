import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { MASTER_ADMIN_EMAIL, MASTER_ADMIN_PASSWORD, JWT_SECRET } = process.env;

const authenticateAdmin = (email: string, password: string): string | null => {
  console.log('MASTER_ADMIN_EMAIL:', MASTER_ADMIN_EMAIL);
  console.log('MASTER_ADMIN_PASSWORD:', MASTER_ADMIN_PASSWORD);
  if (email === MASTER_ADMIN_EMAIL && password === MASTER_ADMIN_PASSWORD) {
   
    const token = jwt.sign({ email }, JWT_SECRET as string, { expiresIn: '1h' });
    return token; 
  }
  return null; 
};

export { authenticateAdmin };
