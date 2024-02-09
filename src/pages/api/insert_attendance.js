import pool from "@/utils/db";
import moment from "moment";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { attendanceStatus, subject, currentDate } = req.body;

    // Format the date in 'YYYY-MM-DD' format with time zone 'UTC'
    const formattedDate = moment().format("YYYY-MM-DD");

    try {
      // Start Transaction
      await pool.query("START TRANSACTION");

      const studentIds = Object.keys(attendanceStatus);
      if (studentIds.length === 0) {
        res.status(405).json({ msg: "Please Fill All Data" });
      }
      for (const studentId of studentIds) {
        const status = attendanceStatus[studentId];

        await pool.query(
          "INSERT INTO attendance (student_id, subject_id, lecture_date, status) VALUES (?, ?, ?, ?)",
          [studentId, subject.id, formattedDate, status]
        );
      }

      // Commit Transaction
      await pool.query("COMMIT");

      res.status(201).json({ msg: "Attendance Successfully Updated" });
    } catch (error) {
      pool.query("ROLLBACK");
      console.error("Error Updating Attendance: ", error);
      return res.status(501).json({ error: "Error Storing Attendance" });
    }
  } else {
    return res.status(405).json({ error: "Invalid Method" });
  }
}
