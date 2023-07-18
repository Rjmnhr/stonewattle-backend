const connection = require("../mySQL-DB");

const Suburbs = {
  getAll: function (callback) {
    return connection.query(
      "SELECT DISTINCT  suburbs.suburb_id , suburbs.suburb_name, suburbs.state, suburbs.postcode, homely_reviews.ratings, domain_insights.rental_yield,domain_insights.renter, domain_insights.owner FROM suburbs JOIN domain_insights ON suburbs.suburb_id = domain_insights.suburb_id JOIN homely_reviews ON suburbs.suburb_id = homely_reviews.suburb_id ",
      callback
    );
  },
  getById: (id, callback) => {
    let query = ` SELECT *
    FROM suburbs
    JOIN domain_insights ON suburbs.suburb_id = domain_insights.suburb_id
    JOIN homely_reviews ON suburbs.suburb_id = homely_reviews.suburb_id
    WHERE suburbs.suburb_id = ${id};`;
    return connection.query(query, callback);
  },
};
module.exports = Suburbs;
