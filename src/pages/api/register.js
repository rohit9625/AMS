require('dotenv').config();
import pool from "@/utils/db";
const bcrypt = require("bcrypt");
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    const { name, email, phone, password } = req.body;

    try {
      // Check if email is already registered or not
      const [existingUser] = await pool.query(
        "SELECT * FROM coordinator WHERE email = ?",
        [email]
      );
      if (existingUser.length > 0) {
        return res.status(409).json({ msg: "Email already registered" });
      } else {

        // Salting of passwords
        const saltRounds = 5;
        const salt = await bcrypt.genSalt(saltRounds); // Salt generated
        // Now hash the password with the salt
        const hashedPassword = await bcrypt.hash(password, salt);

        const [result] = await pool.query(
          "INSERT INTO coordinator (name, email, phone, password) VALUES (?,?,?,?)",
          [name, email, phone, hashedPassword]
        );

        const userID = result.insertId;
        const token = jwt.sign({name, email}, process.env.MY_SECRET); // Signing token
        
        res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Expires=${new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString()}`);
        
        res.status(201).json({ msg: "User registered sucessfully"});
    }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {

    res.status(200).json({ status: "Database Connected"});
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.status(401);
  
  jwt.verify(token, process.env.MY_SECRET, (err, user)=> {
    if(err) return res.status(403);
    req.user = user
    next()
  })
}
