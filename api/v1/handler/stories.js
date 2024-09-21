import { sql } from "@vercel/postgres";
import response from "../../response.js";

export async function create(req, res) {
  try {
    /**
     * @type {{
     *   title: string;
     *   writer: string;
     *   synopsis: string;
     *   category: "Financial" | "Technology" | "Health";
     *   status: 0 | 1;
     *   cover: string;
     * }}
     */
    const json = req.body;
    const { rows } =
      await sql`INSERT INTO stories (title, writer, synopsis, category, status, cover) VALUES (${json.title}, ${json.writer}, ${json.synopsis}, ${json.category}, ${json.status}, ${json.cover}) RETURNING *;`;
    res.json(response.success("Story created successfully", rows[0]));
  } catch (error) {
    res.status(500);
    res.json(response.error(error.message));
  }
}

export async function index(req, res) {
  try {
    const { rows } = await sql`SELECT * FROM stories;`;
    res.json(response.success("Stories fetched successfully", rows));
  } catch (error) {
    res.status(500);
    res.json(response.error(error.message));
  }
}

export async function show(req, res) {
  const { id } = req.params;
  try {
    const { rows } = await sql`SELECT * FROM stories WHERE id = ${id};`;
    if (rows.length === 0) {
      res.status(404);
      res.json(response.error("Story not found"));
    }
    res.json(response.success("Story fetched successfully", rows[0]));
  } catch (error) {
    res.status(500);
    res.json(response.error(error.message));
  }
}
