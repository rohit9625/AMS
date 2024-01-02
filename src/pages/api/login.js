require("dotenv").config();
import pool from "@/utils/db";
const bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  // Check request method
  if (req.method === "POST") {
    // Collect req.body
    const { email, password } = req.body;

    try {
      const [userRows] = await pool.query(
        "SELECT * FROM coordinator WHERE email = ? ",
        [email]
      );
      // Check if user found
      if (userRows.length > 0) {
        const user = userRows[0];
        // If yes then check for password match
        const passwordMatched = await bcrypt.compare(password, user.password);
        if (passwordMatched) {
          // Generate token
          const token = jwt.sign(
            { name: user.name, email: user.email },
            process.env.MY_SECRET
          );
          res.setHeader(
            "Set-Cookie",
            `token=${token}; HttpOnly; Path=/; Expires=${new Date(
              Date.now() + 24 * 60 * 60 * 1000
            ).toUTCString()}`
          );
          return res.status(201).json({ msg: "Logged in sucessfully" });
        } else {
          return res.status(403).json({ msg: "Incorrect password" });
        }
      } else {
        return res.status(404).json({ msg: "User not exists" });
      }
    } catch (error) {
      return res.status(501).json({ msg: "Internal server error" });
    }
  }
}
