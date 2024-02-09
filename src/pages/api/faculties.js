import pool from "@/utils/db";
import CryptoJS from "crypto-js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const [faculties, fields] = await pool.query(
        `SELECT f.id, f.name, f.contact_no, f.deptID, d.name AS department, f.email, f.userID, f.password
        FROM faculties f
        JOIN departments d ON f.deptID = d.id`
      );

      // Decryption function
      function decryptPassword(encryptedPassword) {
        const decryptedBytes = CryptoJS.AES.decrypt(
          encryptedPassword,
          "secret-key"
        );
        const decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);
        return decryptedPassword;
      }

      // Decrypt passwords in the 'faculties' array
      const facultiesWithDecryptedPasswords = faculties.map((faculty) => {
        const decryptedPassword = decryptPassword(faculty.password);
        return { ...faculty, password: decryptedPassword };
      });

      res.json(facultiesWithDecryptedPasswords);
    } catch (error) {
      console.error("Error retrieving student data:", error);
      res.status(500).json({ msg: "Internal Server Error", error: error });
    }
  } else if (req.method === "POST") {
    try {
      // Destructure the req.body
      const {
        firstName,
        lastName,
        email,
        userID,
        password,
        contact_no,
        department,
        subject,
      } = req.body;

      const fullName = `${firstName} ${lastName}`;

      // Check if student already exists in the database
      const [results] = await pool.query(
        `SELECT name FROM faculties WHERE email = ?`,
        [email]
      );

      if (results.length > 0) {
        res.status(409).json({ msg: "Faculty already exists" });
        return;
      }

      const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        "secret-key"
      ).toString();

      // Start a database transaction
      await pool.query("START TRANSACTION");

      // Insert data into the students table
      const [insertResult] = await pool.query(
        `INSERT INTO faculties (name, email, userID, password, contact_no, deptID)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [fullName, email, userID, encryptedPassword, contact_no, department]
      );

      // Retrieve the ID of the last inserted student
      const insertID = insertResult.insertId;

      // Insert data into the enrollments table
      await pool.query(
        `INSERT INTO teaches (subject_id, faculty_id)
        VALUES (?, ?)`,
        [subject, insertID]
      );

      // Commit the transaction
      await pool.query("COMMIT");

      // Send a success response
      res.status(201).json({ msg: "Faculty added successfully" });
    } catch (error) {
      // If any error occurs, rollback the transaction
      await pool.query("ROLLBACK");

      console.error("Error adding faculty:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "DELETE") {
    const { userID, confirmation } = req.body;
    console.log(req.body);

    try {
      // Check if student already exists in the database
      const [results] = await pool.query(
        `SELECT f.id, f.name, f.contact_no, d.name AS department, f.email, f.userID
        FROM faculties f
        JOIN departments d ON f.deptID = d.id
        WHERE f.userID = ?`,
        [userID]
      );

      if (results.length === 0) {
        return res.status(404).json({ msg: "Faculty not found" });
      }
      //
      const faculty = results[0];
      if (!confirmation) {
        res.status(201).json({ faculty: faculty });
        return;
      }

      await pool.query("START TRANSACTION");
      // Delete entry from teaches table
      await pool.query(`DELETE FROM teaches WHERE faculty_id = ?`, [
        faculty.id,
      ]);

      // Delete faculty data from faculties table
      await pool.query(`DELETE FROM faculties WHERE id = ?`, [faculty.id]);

      await pool.query("COMMIT");

      res.status(201).json({ msg: "Faculty deleted successfully" });
    } catch (error) {
      await pool.query("ROLLBACK");
      console.error("Error deleting faculty: ", error);
      res.status(501).json({ msg: "Internal server error" });
    }
  }
}
