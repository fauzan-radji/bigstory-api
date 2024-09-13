const { sql } = require("@vercel/postgres");
const response = require("../response");

module.exports = {
  create(req, res) {
    res.json({ message: "create" });
  },

  async index(req, res) {
    try {
      const { rows } = await sql`SELECT * FROM stories;`;
      res.json(response.success("Stories fetched successfully", rows));
    } catch (error) {
      res.status(500);
      res.json({ error: error.message });
    }
  },

  async show(req, res) {
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
  },
};
