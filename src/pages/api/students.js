import pool from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const [students, fields] = await pool.query(
        `SELECT s.id, s.name, s.roll_no, s.contact_no, s.email, b.name AS branch, c.name AS course 
        FROM students s
        JOIN enrollments e ON s.id = e.student_id
        JOIN branches b ON e.branch_id = b.id
        JOIN courses c ON e.course_id = c.id`
      );
      res.json(students);
    } catch (error) {
      console.error("Error retrieving student data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      // Destructure the req.body
      const { name, roll_no, contact_no, email, dob, course, branch } =
        req.body;

      // Check if student already exists in the database
      const [results] = await pool.query(
        `SELECT name FROM students WHERE roll_no = ?`,
        [roll_no]
      );

      if (results.length > 0) {
        res.status(409).json({ msg: "Student already exists" });
        return;
      }

      // Start a database transaction
      await pool.query("START TRANSACTION");

      // Insert data into the students table
      const [studentResult] = await pool.query(
        `INSERT INTO students (name, roll_no, contact_no, email, dob)
        VALUES (?, ?, ?, ?, ?)`,
        [name, roll_no, contact_no, email, dob]
      );

      // Retrieve the ID of the last inserted student
      const lastStudentID = studentResult.insertId;

      // Insert data into the enrollments table
      await pool.query(
        `INSERT INTO enrollments (student_id, course_id, branch_id)
        VALUES (?, ?, ?)`,
        [lastStudentID, course, branch === "" ? null : branch]
      );

      // Commit the transaction
      await pool.query("COMMIT");

      // Send a success response
      res.status(201).json({ msg: "Student added successfully" });
    } catch (error) {
      // If any error occurs, rollback the transaction
      await pool.query("ROLLBACK");

      console.error("Error adding student:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "DELETE") {
    // Destructure data from the client
    const { roll_no, confirmation } = req.body;

    try {
      // Check if student already exists in the database
      const [results] = await pool.query(
        `SELECT id,name,roll_no,email,contact_no FROM students WHERE roll_no = ?`,
        [roll_no]
      );

      if (results.length === 0) {
        return res.status(404).json({ msg: "Student not found" });
      }
      //
      const student = results[0];
      if (!confirmation) {
        res.status(201).json({ student });
        return;
      }

      // Else delete the student if confirmation is true
      // Delete student from the students table
      await pool.query(`DELETE FROM students WHERE id = ?`, [
        student.id,
      ]);
      // No need to delete from enrollments table
      // The corresponding record will be deleted automatically due DB schema
      res.status(201).json({msg: "Student deleted successfully"})
    } catch (error) {
      console.error("Error deleting student: ", error);
      res.status(501).json({ msg: "Internal server error" });
    }

  }
}
