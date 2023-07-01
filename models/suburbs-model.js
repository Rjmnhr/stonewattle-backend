const connection = require("../mySQL-DB");

const Suburbs = {
  getAll: function (callback) {
    return connection.query(
      "SELECT * FROM suburbs JOIN domain_insights ON suburbs.suburb_id = domain_insights.suburb_id JOIN homely_reviews ON suburbs.suburb_id = homely_reviews.suburb_id limit 2000 ;",
      callback
    );
  },
};
module.exports = Suburbs;
