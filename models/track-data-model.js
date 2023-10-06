const pool = require("../mySQL-DB");

const TrackedData = {
  saveTrackedData1: async (saveTrackedData1) => {
    const connection = await pool.getConnection();

    try {
      const query = `
    
      INSERT INTO tracking_data_1 (type, bedrooms,states, area, budget, Low_vacancy_rate, Family_friendly, High_rental_yield, Average_days_on_market, High_rated_by_residents,
         Low_supply, Population_growth, Low_unemployment, Australian_born, Crime_rate, Great_for_schools, Great_for_hospitals,
          Recent_growth_in_properties, Higher_proportion_of_owners, Relative_income_of_residents, Public_transport,duration,ip_address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)
    `;

      const [rows] = await connection.query(query, [
        saveTrackedData1.type,
        saveTrackedData1.bedrooms,
        saveTrackedData1.states,
        saveTrackedData1.area,
        saveTrackedData1.budget,

        saveTrackedData1.Low_vacancy_rate,
        saveTrackedData1.Family_friendly,
        saveTrackedData1.High_rental_yield,
        saveTrackedData1.Average_days_on_market,

        saveTrackedData1.High_rated_by_residents,
        saveTrackedData1.Low_supply,
        saveTrackedData1.Population_growth,
        saveTrackedData1.Low_unemployment,

        saveTrackedData1.Australian_born,
        saveTrackedData1.Crime_rate,
        saveTrackedData1.Great_for_schools,
        saveTrackedData1.Great_for_hospitals,
        saveTrackedData1.Recent_growth_in_properties,

        saveTrackedData1.Higher_proportion_of_owners,
        saveTrackedData1.Relative_income_of_residents,
        saveTrackedData1.Public_transport,
        saveTrackedData1.duration,
        saveTrackedData1.ipAddress, // Add the IP address here
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

  saveTrackedData2: async (saveTrackedData2) => {
    const connection = await pool.getConnection();

    try {
      const query = `
    
      INSERT INTO tracking_data_2 (type, bedrooms,states, area, budget, Low_vacancy_rate, Family_friendly, High_rental_yield, Average_days_on_market, High_rated_by_residents,
         Low_supply, Population_growth, Low_unemployment, Australian_born, Crime_rate, Great_for_schools, Great_for_hospitals,
          Recent_growth_in_properties, Higher_proportion_of_owners, Relative_income_of_residents, Public_transport,duration,ip_address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)
    `;

      const [rows] = await connection.query(query, [
        saveTrackedData2.type,
        saveTrackedData2.bedrooms,
        saveTrackedData2.states,
        saveTrackedData2.area,
        saveTrackedData2.budget,

        saveTrackedData2.Low_vacancy_rate,
        saveTrackedData2.Family_friendly,
        saveTrackedData2.High_rental_yield,
        saveTrackedData2.Average_days_on_market,

        saveTrackedData2.High_rated_by_residents,
        saveTrackedData2.Low_supply,
        saveTrackedData2.Population_growth,
        saveTrackedData2.Low_unemployment,

        saveTrackedData2.Australian_born,
        saveTrackedData2.Crime_rate,
        saveTrackedData2.Great_for_schools,
        saveTrackedData2.Great_for_hospitals,
        saveTrackedData2.Recent_growth_in_properties,

        saveTrackedData2.Higher_proportion_of_owners,
        saveTrackedData2.Relative_income_of_residents,
        saveTrackedData2.Public_transport,
        saveTrackedData2.duration,
        saveTrackedData2.ipAddress, // Add the IP address here
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
  saveTrackedData3: async (saveTrackedData3) => {
    const connection = await pool.getConnection();

    try {
      const query = `
    
      INSERT INTO tracking_data_3 (ip_address,path)
      VALUES (?, ?)
    `;

      const [rows] = await connection.query(query, [
        saveTrackedData3.path, // Add the path here
        saveTrackedData3.ipAddress, // Add the IP address here
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
