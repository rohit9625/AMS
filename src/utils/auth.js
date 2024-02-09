import jwt from 'jsonwebtoken';


export const isTokenValid = (token) => {
  const secretKey = process.env.MY_SECRET; // Replace with your actual secret key
  try {
    const decodedToken = jwt.verify(token, secretKey);
    // Token is valid
    return true;
  } catch (error) {
    // Token verification failed
    return false;
  }
};
export const tokenProps = (token)=> {
  try{
    const decodedToken = jwt.decode(token);
    return decodedToken;
  }catch(err) {
    console.error(err)
  }
}