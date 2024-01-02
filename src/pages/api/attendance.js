import pool from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { studentID } = req.body;

    try {
      // Fetch attendance data for the specific student from the database
      const [attendance, attendanceFields] = await pool.query(
        `SELECT
            s.name AS subject_name,
            COUNT(*) AS total_lectures,
            COUNT(CASE WHEN status = 'present' THEN 1 END) AS attended_lectures
          FROM attendance a
          JOIN subjects s ON a.subject_id = s.id
          WHERE a.student_id = ?
          GROUP BY a.subject_id;`,
        [studentID]
      );

      if (attendance.length == 0) {
        res
          .status(404)
          .json({ attendanceData: [], msg: "Attendance not found" });
      }
      //else

      // Send the fetched attendance data as the response
      res.json({
        attendanceData: attendance,
        msg: "Attendance fetched sucessfully",
      });
    } catch (error) {
      console.error(
        `Error retrieving attendance data for student ${studentID}:`,
        error
      );
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    try {
      const [attendance, fields] = await pool.query(`
        SELECT
          a.student_id,
          s.name AS subject_name,
          COUNT(*) AS total_lectures,
          COUNT(CASE WHEN status = 'present' THEN 1 END) AS attended_lectures
        FROM attendance a
        JOIN subjects s ON a.subject_id = s.id
        GROUP BY a.student_id, a.subject_id
      `);

      // Transform the data to have a structure similar to the POST response
      // const formattedAttendance = attendance.reduce((acc, entry) => {
      //   const studentID = entry.student_id;
      //   if (!acc[studentID]) {
      //     acc[studentID] = [];
      //   }

      //   acc[studentID].push({
      //     subject_name: entry.subject_name,
      //     total_lectures: entry.total_lectures,
      //     attended_lectures: entry.attended_lectures,
      //   });

      //   return acc;
      // }, {});

      res.status(200).json({ attendance });
    } catch (error) {
      console.error("Error retrieving attendance: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
