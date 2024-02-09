import pool from "@/utils/db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { roll_no } = req.body;

    console.log(roll_no);
    try {
      const [results] = await pool.query(
        `
            SELECT s.id, s.name, s.email, s.roll_no, s.contact_no, b.name AS branch
            FROM students s
            JOIN enrollments e ON s.id = e.student_id
            JOIN branches b ON e.branch_id = b.id
            WHERE s.roll_no = ?`,
        [roll_no]
      );

      if (results.length > 0) {
        const student = results[0];

        const token = jwt.sign(
          {
            id: student.id,
            roll_no: student.roll_no,
            name: student.name,
            contact: student.contact_no,
            email: student.email,
            branch: student.branch,
            userType: "student",
          },
          process.env.MY_SECRET
        );
        
        res.setHeader(
          "Set-Cookie",
          `token=${token}; Path=/; Expires=${new Date(
            Date.now() + 24 * 60 * 60 * 1000
          ).toUTCString()}`
        );

        return res.status(201).json({ results });
      }
      return res.status(404).json({ msg: "Student Not Found" });

    } catch (error) {
      console.error("Error Fetching Attendance : ", error);
      return res.status(501).json({ msg: "Error Fetching Attendance" });
    }
  } else {
    return res.status(405).json({ msg: "Invalid Method" });
  }
}
