import jwt from 'jsonwebtoken';

const { MASTER_ADMIN_EMAIL, MASTER_ADMIN_PASSWORD } = process.env;

// Admin giriş işlemleri için bir hizmet
const authenticateAdmin = (email: string, password: string): string | null => {
    console.log('MASTER_ADMIN_EMAIL:', MASTER_ADMIN_EMAIL);
    console.log('MASTER_ADMIN_PASSWORD:', MASTER_ADMIN_PASSWORD);
  if (email === MASTER_ADMIN_EMAIL && password === MASTER_ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    return token; // Başarılı girişte token döndür
  }
  return null; // Giriş başarısız
};

export { authenticateAdmin };
