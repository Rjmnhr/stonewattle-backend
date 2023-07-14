const connection = require("../mySQL-DB");

const DomainInsights = {
  filter: (filter, callback) => {
    let query = `SELECT DISTINCT domain_insights.suburb_id ,domain_insights.postcode, state_code, domain_insights.suburb_name, max_bedrooms , current_vacancy_rate,family,rental_population, ratings, growth_population, country_of_birth_australia,employment_worked_unemployed,median_weekly_income_family
    ,CAST(great_for_schools AS UNSIGNED) AS great_for_schools_int, CAST(great_for_medical_facilities AS UNSIGNED) AS great_for_medical_facilities_int, CAST(not_great_for_public_transport AS UNSIGNED) AS not_great_for_public_transport_int,
     ${filter.rentalYield} , ${filter.growth_in_property}, ${filter.availability_of_supply}, ${filter.demand_prev_month} , category
    FROM domain_insights 
    JOIN real_estate_investment ON domain_insights.domain_search_string = real_estate_investment.domain_search_string
    JOIN homely_reviews ON domain_insights.suburb_id = homely_reviews.suburb_id
    JOIN census ON domain_insights.postcode=census.postcode

    WHERE census_year="2021" AND type = '${filter.type}' AND median_price_int < '${filter.budget}'`;
    if (filter.states.length > 0 && filter.states.indexOf("unsure") === -1) {
      let listOfStates = filter.states.join("','");
      query += ` AND domain_insights.state IN ('${listOfStates}')`;
    }
    if (filter.bedrooms !== "unsure") {
      query += ` AND bedrooms = '${filter.bedrooms}'`;
    }
    if (filter.area !== "unsure") {
      if (filter.area === "rural") {
        console.log(filter.area);

        query += `AND category IN ('Outer Regional Australia','Inner Regional Australia' )`;
      }
      if (filter.area === "remote") {
        query += `AND category IN ('Very Remote Australia','Remote Australia')`;
      }
      if (filter.area === "metropolitian") {
        query += `AND category ='Metropolitian'`;
      }
    }

    return connection.query(query, callback);
  },
};

module.exports = DomainInsights;
