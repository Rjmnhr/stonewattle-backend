const pool = require("../mySQL-DB");

const DomainInsights = {
  filter: async (filter, callback) => {
    const connection = await pool.getConnection();
    try {
      let query = `SELECT DISTINCT domain_insights.suburb_id ,domain_insights.postcode, state_code, domain_insights.suburb_name, current_vacancy_rate,
      family,rental_population, ratings, growth_population, country_of_birth_australia,employment_worked_unemployed,median_weekly_income_family
      ,CAST(great_for_schools AS UNSIGNED) AS great_for_schools_int, CAST(great_for_medical_facilities AS UNSIGNED) AS great_for_medical_facilities_int,
       CAST(great_for_public_transport AS UNSIGNED) AS great_for_public_transport_int,latitude,longitude,all_crimes,

       ${filter.rentalYield} , ${filter.growth_in_property}, ${filter.availability_of_supply}, ${filter.demand_prev_month} , category
      FROM domain_insights
      JOIN real_estate_investment ON domain_insights.domain_search_string = real_estate_investment.domain_search_string
      JOIN homely_reviews ON domain_insights.suburb_id = homely_reviews.suburb_id
      JOIN census ON domain_insights.postcode=census.postcode
      JOIN crime_rate ON domain_insights.postcode=crime_rate.postcode
  
      WHERE census_year="2021" AND type = '${filter.type}' AND median_price_80 <= '${filter.budget}'`;
      if (filter.states.length > 0 && filter.states.indexOf("unsure") === -1) {
        let listOfStates = filter.states.join("','");
        query += ` AND domain_insights.state IN ('${listOfStates}')`;
      }
      if (filter.bedrooms !== "unsure") {
        query += ` AND bedrooms = '${filter.bedrooms}'`;
      }
      if (filter.area !== "unsure") {
        if (filter.area === "rural") {
          query += `AND category IN ('Outer Regional Australia','Inner Regional Australia' )`;
        } else if (filter.area === "remote") {
          query += `AND category IN ('Very Remote Australia','Remote Australia')`;
        } else {
          query += `AND category ='Metropolitian'`;
        }
      }

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

module.exports = DomainInsights;
