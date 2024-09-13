const { sql } = require("@vercel/postgres");
const response = require("../response");

module.exports = {
  create(req, res) {
    res.json({ message: "create" });
  },
  async read(req, res) {
    try {
      const { rows } = await sql`SELECT * FROM stories;`;
      res.json(response.success("Stories fetched successfully", rows));
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};
