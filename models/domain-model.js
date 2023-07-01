const connection = require("../mySQL-DB");

const DomainInsights = {
  filter: (filter, callback) => {
    let query = `SELECT * FROM stonewattle.domain_insights WHERE type = '${filter.type}' AND median_price_int < '${filter.budget}' AND state = '${filter.state}' AND bedrooms = '${filter.bedrooms}';`;
    return connection.query(query, callback);
  },
};

module.exports = DomainInsights;
