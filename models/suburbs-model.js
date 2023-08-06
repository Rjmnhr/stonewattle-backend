const pool = require("../mySQL-DB");

const Suburbs = {
  getAll: async () => {
    const connection = await pool.getConnection();
    try {
      let query = `SELECT DISTINCT  suburbs.suburb_id , suburbs.suburb_name, suburbs.state, suburbs.postcode, homely_reviews.ratings, domain_insights.rental_yield,domain_insights.renter, domain_insights.owner
      FROM suburbs 
      JOIN domain_insights ON suburbs.suburb_id = domain_insights.suburb_id 
      JOIN homely_reviews ON suburbs.suburb_id = homely_reviews.suburb_id `;
      const [rows, fields] = await connection.query(query);
      return rows;
    } catch (err) {
      // Handle errors here
      console.error(err);
      throw err;
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  },
  getById: async (id) => {
    const connection = await pool.getConnection();
    try {
      let query = `SELECT * FROM suburbs
      JOIN domain_insights ON suburbs.suburb_id = domain_insights.suburb_id
      JOIN homely_reviews ON suburbs.suburb_id = homely_reviews.suburb_id
      WHERE suburbs.suburb_id = ${id};`;

      const [rows, fields] = await connection.query(query);
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
module.exports = Suburbs;
