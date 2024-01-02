import pool from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const [courses, coursesFields] = await pool.query("SELECT * FROM courses");
      const [branches, branchesFields] = await pool.query("SELECT * FROM branches");

      res.json({ courses: courses, branches : branches });
    } catch (error) {
      console.error("Error fetching options:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
