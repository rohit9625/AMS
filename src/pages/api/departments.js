import pool from "@/utils/db";

export default async function handler(req, res) {
    if(req.method === "GET") {
        try {
            const [departments, fields] = await pool.query(
                `SELECT * FROM departments;`
            );
    
            res.status(200).json(departments);
        }catch(error) {
            console.log(error);
            res.status(501).json({msg: "Internal server error", error: error});
        }
    }
}