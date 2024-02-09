require("dotenv").config();
import pool from "@/utils/db";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  function decryptPassword(encryptedPassword) {
    const decryptedBytes = CryptoJS.AES.decrypt(
      encryptedPassword,
      "secret-key"
    );
    const decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedPassword;
  }
  function compare(decryptedPassword, originalPassword) {
    if(decryptedPassword === originalPassword){
        return true
    }else {
      return false
    }
  }
  // Check request method
  if (req.method === "POST") {
    // Collect req.body
    const { userID, password } = req.body;

    try {
      const [userRows] = await pool.query(
        "SELECT * FROM faculties WHERE userID = ? ",
        [userID]
      );
      // Check if user found
      if (userRows.length > 0) {
        const user = userRows[0];
        const decryptedPassword = decryptPassword(user.password);

        // If yes then check for password match
        const passwordMatched = compare(decryptedPassword, password);
        if (passwordMatched) {
          // Generate token
          const token = jwt.sign(
            { id:user.id, name: user.name, email: user.email, userType: "faculty" },
            process.env.MY_SECRET
          );
          res.setHeader(
            "Set-Cookie",
            `token=${token}; Path=/; Expires=${new Date(
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
