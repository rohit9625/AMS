import pool from "@/utils/db";

export default async function handler(req, res) {
if (req.method === "GET") {
    try {
      const [subjects, fields] = await pool.query("SELECT * FROM subjects");

      res.status(201).json({subjects});
    } catch (error) {}
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}