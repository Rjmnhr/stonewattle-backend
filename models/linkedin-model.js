const pool = require("../mySQL-DB");

const LinkedInData = {
  getAll: async () => {
    const connection = await pool.getConnection();

    try {
      const query = `SELECT * FROM linkedin_latest`;

      const [rows] = await connection.query(query);

      return rows;
    } catch (err) {
      // Handle errors here
      console.error(err);
      throw err;
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  },
};

module.exports = LinkedInData;
