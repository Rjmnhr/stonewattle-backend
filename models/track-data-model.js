const pool = require("../mySQL-DB");

const TrackedData = {
  saveTrackedData: async (saveTrackedData) => {
    const connection = await pool.getConnection();

    try {
      const query = `
    
      INSERT INTO tracking_data (type, bedrooms,states, area, budget, Low_vacancy_rate, Family_friendly, High_rental_yield, Average_days_on_market, High_rated_by_residents,
         Low_supply, Population_growth, Low_unemployment, Australian_born, Crime_rate, Great_for_schools, Great_for_hospitals,
          Recent_growth_in_properties, Higher_proportion_of_owners, Relative_income_of_residents, Public_transport,duration,ip_address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)
    `;

      const [rows] = await connection.query(query, [
        saveTrackedData.type,
        saveTrackedData.bedrooms,
        saveTrackedData.states,
        saveTrackedData.area,
        saveTrackedData.budget,

        saveTrackedData.Low_vacancy_rate,
        saveTrackedData.Family_friendly,
        saveTrackedData.High_rental_yield,
        saveTrackedData.Average_days_on_market,

        saveTrackedData.High_rated_by_residents,
        saveTrackedData.Low_supply,
        saveTrackedData.Population_growth,
        saveTrackedData.Low_unemployment,

        saveTrackedData.Australian_born,
        saveTrackedData.Crime_rate,
        saveTrackedData.Great_for_schools,
        saveTrackedData.Great_for_hospitals,
        saveTrackedData.Recent_growth_in_properties,

        saveTrackedData.Higher_proportion_of_owners,
        saveTrackedData.Relative_income_of_residents,
        saveTrackedData.Public_transport,
        saveTrackedData.duration,
        saveTrackedData.ipAddress, // Add the IP address here
      ]);

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

module.exports = TrackedData;
