import jwt from 'jsonwebtoken';

const secretKey = process.env.MY_SECRET; // Replace with your actual secret key

export const isTokenValid = (token) => {
  try {
    const decodedToken = jwt.verify(token, secretKey);
    // Token is valid
    return true;
  } catch (error) {
    // Token verification failed
    return false;
  }
};