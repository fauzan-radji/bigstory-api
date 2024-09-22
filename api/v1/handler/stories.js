import { sql } from "@vercel/postgres";
import response from "../../response.js";

// a function to group keywords by story id
function groupKeywords(rows) {
  return rows.reduce((acc, row) => {
    const story = acc.find((s) => s.id === row.id);
    if (story) {
      story.keywords.push({
        id: row.keyword_id,
        text: row.keyword,
      });
    } else {
      const keywords = [];
      if (row.keyword_id) {
        keywords.push({ id: row.keyword_id, text: row.keyword });
      }
      acc.push({
        id: row.id,
        title: row.title,
        writer: row.writer,
        synopsis: row.synopsis,
        category: row.category,
        status: row.status,
        cover: row.cover,
        keywords,
      });
    }
    return acc;
  }, []);
}

export async function create(req, res) {
  // TODO: add authentication and authorization with JWT
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
    const { rows } = await sql`SELECT
        stories.*,
        keywords.id as keyword_id,
        keywords.text as keyword
      FROM stories
      LEFT JOIN keyword_story
        ON stories.id = keyword_story.story_id
      LEFT JOIN keywords
        ON keyword_story.keyword_id = keywords.id;`;

    const stories = groupKeywords(rows);
    res.json(response.success("Stories fetched successfully", stories));
  } catch (error) {
    res.status(500);
    res.json(response.error(error.message));
  }
}

export async function show(req, res) {
  const { id } = req.params;
  try {
    const { rows } = await sql`SELECT
        stories.*,
        keywords.id as keyword_id,
        keywords.text as keyword
      FROM stories
      LEFT JOIN keyword_story
        ON stories.id = keyword_story.story_id
      LEFT JOIN keywords
        ON keyword_story.keyword_id = keywords.id
      WHERE stories.id = ${id};`;
    if (rows.length === 0) {
      res.status(404);
      res.json(response.error("Story not found"));
    }
    const story = groupKeywords(rows);
    res.json(response.success("Story fetched successfully", story[0]));
  } catch (error) {
    res.status(500);
    res.json(response.error(error.message));
  }
}
