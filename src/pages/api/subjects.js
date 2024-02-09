import pool from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const [subjects, fields] = await pool.query("SELECT * FROM subjects");

      res.status(201).json({ subjects });
    } catch (error) {
      console.error(error);
      return res.status(501).json({ msg: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    const facultyID  = req.body.facultyID;
    console.log(req.body)
    try {
      const [subjects, fields] = await pool.query(
        `SELECT s.id, s.name, s.code
        FROM subjects s
        JOIN teaches ON teaches.subject_id = s.id
        WHERE teaches.faculty_id = ?`,
        [facultyID]
      );

      const subject = subjects[0];
      console.log()

      res.status(200).json({subject})
    } catch (error) {
      console.error(error);
      return res.status(501).json({ msg: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}
