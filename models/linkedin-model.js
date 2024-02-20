const pool = require("../mySQL-DB");

const LinkedinModel = {
  getData: async (getData) => {
    const connection = await pool.getConnection();
    const {
      desired_title,
      ug_degree,
      additional_degree,
      ug_tier,
      experience,
      company_size,
      company_sector,
      byFactor,
    } = getData;
    let listOfCompanies = JSON.parse(getData.companies);
    const columns = [
      "org_0",
      "org_1",
      "org_2",
      "org_3",
      "org_4",
      "org_5",
      "org_6",
      "org_7",
    ];
    const conditions = listOfCompanies
      .map((company) => {
        return columns
          .map((column) => `${column} LIKE '%${company}%'`)
          .join(" OR ");
      })
      .join(" OR ");

    try {
      let query = "";
      if (byFactor === "title") {
        query = `SELECT
     
        (SELECT COUNT(*) FROM Linkedin_data
        WHERE '${desired_title}' IN (mapped_title_0, mapped_title_1,mapped_title_2, mapped_title_3, mapped_title_4, mapped_title_5,  mapped_title_6, mapped_title_7)) 
        AS row_counts_desired_title,
  
        (SELECT COUNT(*) FROM Linkedin_data
        WHERE '${ug_degree}' IN (mapped_digree_0, mapped_digree_1,mapped_digree_2, mapped_digree_3)) 
        AS row_counts_ug_degree,
  
        (SELECT COUNT(*) FROM Linkedin_data
        WHERE '${additional_degree}' IN (mapped_digree_0, mapped_digree_1,mapped_digree_2, mapped_digree_3)) 
        AS row_counts_additional_degree,
        (SELECT COUNT(*) FROM Linkedin_data
        WHERE '${ug_tier}' IN (tier_mapping_institute_0, tier_mapping_institute_1,tier_mapping_institute_2, tier_mapping_institute_3)) 
        AS row_counts_ug_tier,
  
        (SELECT COUNT(*) FROM Linkedin_data
        WHERE '${experience}' IN (job_0_duration, job_1_duration,job_2_duration, job_3_duration, job_4_duration, job_5_duration,  job_6_duration, job_7_duration)) 
        AS row_counts_experience,
  
        (SELECT COUNT(*) FROM Linkedin_data
        WHERE '${company_size}' IN (mapped_company_0_emp_count, mapped_company_1_emp_count,mapped_company_2_emp_count, mapped_company_3_emp_count, mapped_company_4_emp_count, mapped_company_5_emp_count,  mapped_company_6_emp_count, mapped_company_7_emp_count)) 
        AS row_counts_company_size,
  
        (SELECT COUNT(*) FROM Linkedin_data
        WHERE '${company_sector}' IN (mapped_company_0_industry, mapped_company_1_industry,mapped_company_2_industry, mapped_company_3_industry, mapped_company_4_industry, mapped_company_5_industry,  mapped_company_6_industry, mapped_company_7_industry)) 
        AS row_counts_company_sector,
       
        (SELECT COUNT(*) FROM Linkedin_data 
         WHERE '${ug_degree}' IN (mapped_digree_0, mapped_digree_1,mapped_digree_2, mapped_digree_3)
         AND '${additional_degree}' IN (mapped_digree_0, mapped_digree_1,mapped_digree_2, mapped_digree_3)) 
         AS row_counts_ug_and_add_title,
  
         (SELECT COUNT(*) FROM Linkedin_data 
         WHERE '${ug_degree}' IN (mapped_digree_0, mapped_digree_1,mapped_digree_2, mapped_digree_3)
         AND '${desired_title}' IN (mapped_title_0, mapped_title_1,mapped_title_2, mapped_title_3, mapped_title_4, mapped_title_5,  mapped_title_6, mapped_title_7)) 
         AS row_counts_ug_and_desired_title,
  
         (SELECT COUNT(*) FROM Linkedin_data 
         WHERE '${ug_degree}' IN (mapped_digree_0, mapped_digree_1,mapped_digree_2, mapped_digree_3)
         AND '${ug_tier}' IN (tier_mapping_institute_0, tier_mapping_institute_1,tier_mapping_institute_2, tier_mapping_institute_3)) 
         AS row_counts_ug_degree_and_ug_tier;`;
      } else {
        query = `SELECT
     
        (SELECT COUNT(*) FROM Linkedin_data
        WHERE '${desired_title}' IN (mapped_title_0, mapped_title_1,mapped_title_2, mapped_title_3, mapped_title_4, mapped_title_5,  mapped_title_6, mapped_title_7)) 
        AS row_counts_desired_title,
  
        (SELECT COUNT(*) FROM Linkedin_data
        WHERE '${ug_degree}' IN (mapped_digree_0, mapped_digree_1,mapped_digree_2, mapped_digree_3)) 
        AS row_counts_ug_degree,
  
        (SELECT COUNT(*) FROM Linkedin_data
        WHERE '${additional_degree}' IN (mapped_digree_0, mapped_digree_1,mapped_digree_2, mapped_digree_3)) 
        AS row_counts_additional_degree,
        (SELECT COUNT(*) FROM Linkedin_data
        WHERE '${ug_tier}' IN (tier_mapping_institute_0, tier_mapping_institute_1,tier_mapping_institute_2, tier_mapping_institute_3)) 
        AS row_counts_ug_tier,
  
        (SELECT COUNT(*) FROM Linkedin_data
        WHERE '${experience}' IN (job_0_duration, job_1_duration,job_2_duration, job_3_duration, job_4_duration, job_5_duration,  job_6_duration, job_7_duration)) 
        AS row_counts_experience,
  
        (SELECT COUNT(*) FROM Linkedin_data
        WHERE '${company_size}' IN (mapped_company_0_emp_count, mapped_company_1_emp_count,mapped_company_2_emp_count, mapped_company_3_emp_count, mapped_company_4_emp_count, mapped_company_5_emp_count,  mapped_company_6_emp_count, mapped_company_7_emp_count)) 
        AS row_counts_company_size,
  
        (SELECT COUNT(*) FROM Linkedin_data
        WHERE '${company_sector}' IN (mapped_company_0_industry, mapped_company_1_industry,mapped_company_2_industry, mapped_company_3_industry, mapped_company_4_industry, mapped_company_5_industry,  mapped_company_6_industry, mapped_company_7_industry)) 
        AS row_counts_company_sector,
       
        (SELECT COUNT(*) FROM Linkedin_data 
         WHERE '${ug_degree}' IN (mapped_digree_0, mapped_digree_1,mapped_digree_2, mapped_digree_3)
         AND '${additional_degree}' IN (mapped_digree_0, mapped_digree_1,mapped_digree_2, mapped_digree_3)) 
         AS row_counts_ug_and_add_title,
  
         (SELECT COUNT(*) FROM Linkedin_data 
         WHERE '${ug_degree}' IN (mapped_digree_0, mapped_digree_1,mapped_digree_2, mapped_digree_3)
         AND '${desired_title}' IN (mapped_title_0, mapped_title_1,mapped_title_2, mapped_title_3, mapped_title_4, mapped_title_5,  mapped_title_6, mapped_title_7)) 
         AS row_counts_ug_and_desired_title,
  
         (SELECT COUNT(*) FROM Linkedin_data 
         WHERE (${conditions})
         AND '${ug_degree}' IN (mapped_digree_0, mapped_digree_1,mapped_digree_2, mapped_digree_3)) 
         AS row_counts_ug_and_desired_company,
  
         (SELECT COUNT(*) FROM Linkedin_data 
         WHERE '${ug_degree}' IN (mapped_digree_0, mapped_digree_1,mapped_digree_2, mapped_digree_3)
         AND '${ug_tier}' IN (tier_mapping_institute_0, tier_mapping_institute_1,tier_mapping_institute_2, tier_mapping_institute_3)) 
         AS row_counts_ug_degree_and_ug_tier;`;
      }

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
  getCompanyBased: async (getCompanyBased) => {
    const connection = await pool.getConnection();

    let listOfCompanies = getCompanyBased.companies;

    try {
      // Dynamically construct the SQL query
      const columns = [
        "org_0",
        "org_1",
        "org_2",
        "org_3",
        "org_4",
        "org_5",
        "org_6",
        "org_7",
      ];
      const conditions = listOfCompanies
        .map((company) => {
          return columns
            .map((column) => `${column} LIKE '%${company}%'`)
            .join(" OR ");
        })
        .join(" OR ");

      const query = `
  SELECT  * 
  FROM Linkedin_data
  WHERE ${conditions};
`;

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
  getTotalCount: async (getTotalCount) => {
    const connection = await pool.getConnection();

    try {
      let query = `
      SELECT COUNT(*) FROM Linkedin_data as total_count`;

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
  getCollegeTier: async (getCollegeTier) => {
    const connection = await pool.getConnection();

    try {
      let query = `SELECT DISTINCT
      mapped_institute_0 AS institute_value,
      tier_mapping_institute_0 AS tier_value
    FROM Linkedin_data
    UNION
    SELECT DISTINCT
      mapped_institute_1 AS institute_value,
      tier_mapping_institute_1 AS tier_value
    FROM Linkedin_data
    UNION
    SELECT DISTINCT
      mapped_institute_2 AS institute_value,
      tier_mapping_institute_2 AS tier_value
    FROM Linkedin_data;`;

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
  getCompanySize: async (getCompanySize) => {
    const connection = await pool.getConnection();

    try {
      let query = `SELECT DISTINCT
    mapped_company_0_emp_count as company_size
    FROM Linkedin_data
    UNION
    SELECT DISTINCT
    mapped_company_1_emp_count
    FROM Linkedin_data
    UNION
    SELECT DISTINCT
    mapped_company_2_emp_count
    FROM Linkedin_data
    UNION
    SELECT DISTINCT
    mapped_company_3_emp_count
    FROM Linkedin_data
    UNION
    SELECT DISTINCT
    mapped_company_4_emp_count
    FROM Linkedin_data
    UNION
    SELECT DISTINCT
    mapped_company_5_emp_count
    FROM Linkedin_data
    UNION
    SELECT DISTINCT
    mapped_company_6_emp_count
    FROM Linkedin_data
    UNION
    SELECT DISTINCT
    mapped_company_7_emp_count
    FROM Linkedin_data;`;

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
  getCompanySector: async (getCompanySector) => {
    const connection = await pool.getConnection();

    try {
      let query = `SELECT DISTINCT
    mapped_company_0_industry as company_sector
    FROM Linkedin_data
    UNION
    SELECT DISTINCT
    mapped_company_1_industry
    FROM Linkedin_data
    UNION
    SELECT DISTINCT
    mapped_company_2_industry
    FROM Linkedin_data
    UNION
    SELECT DISTINCT
    mapped_company_3_industry
    FROM Linkedin_data
    UNION
    SELECT DISTINCT
    mapped_company_4_industry
    FROM Linkedin_data
    UNION
    SELECT DISTINCT
    mapped_company_5_industry
    FROM Linkedin_data
    UNION
    SELECT DISTINCT
    mapped_company_6_industry
    FROM Linkedin_data
    UNION
    SELECT DISTINCT
    mapped_company_7_industry
    FROM Linkedin_data;`;

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
  getTitles: async (getRoles) => {
    const connection = await pool.getConnection();

    try {
      let query = `SELECT DISTINCT
      mapped_title_0 as title
    FROM Linkedin_data
    UNION
    SELECT DISTINCT
    mapped_title_1
    FROM Linkedin_data
    UNION
    SELECT DISTINCT
    mapped_title_2
    FROM Linkedin_data
    UNION
    SELECT DISTINCT
    mapped_title_3
    FROM Linkedin_data
    UNION
    SELECT DISTINCT
    mapped_title_4
    FROM Linkedin_data
    UNION
    SELECT DISTINCT
    mapped_title_5
    FROM Linkedin_data
    UNION
    SELECT DISTINCT
    mapped_title_6
    FROM Linkedin_data
    UNION
    SELECT DISTINCT
    mapped_title_7
    FROM Linkedin_data;`;

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
  educationalAndDesired: async (educationalAndDesired) => {
    const connection = await pool.getConnection();
    const { desired_title, ug_degree, ug_tier, byFactor } =
      educationalAndDesired;

    let listOfCompanies = JSON.parse(educationalAndDesired.companies);
    const columns = [
      "org_0",
      "org_1",
      "org_2",
      "org_3",
      "org_4",
      "org_5",
      "org_6",
      "org_7",
    ];
    const conditions = listOfCompanies
      .map((company) => {
        return columns
          .map((column) => `${column} LIKE '%${company}%'`)
          .join(" OR ");
      })
      .join(" OR ");
    try {
      let query = "";
      if (byFactor === "title") {
        query = `
        SELECT *,
        (SELECT COUNT(*) FROM Linkedin_data
         WHERE '${desired_title}' IN (mapped_title_0, mapped_title_1, mapped_title_2, mapped_title_3, mapped_title_4, mapped_title_5, mapped_title_6, mapped_title_7)
         AND '${ug_degree}' IN (mapped_digree_0, mapped_digree_1, mapped_digree_2, mapped_digree_3)
         AND '${ug_tier}' IN (tier_mapping_institute_0, tier_mapping_institute_1,tier_mapping_institute_2, tier_mapping_institute_3)) AS totalCount,
        (SELECT COUNT(*) FROM Linkedin_data
        WHERE '${desired_title}' IN (mapped_title_0, mapped_title_1, mapped_title_2, mapped_title_3, mapped_title_4, mapped_title_5, mapped_title_6, mapped_title_7)) AS titleCount
        FROM Linkedin_data
        WHERE '${desired_title}' IN (mapped_title_0, mapped_title_1, mapped_title_2, mapped_title_3, mapped_title_4, mapped_title_5, mapped_title_6, mapped_title_7)
        AND '${ug_degree}' IN (mapped_digree_0, mapped_digree_1, mapped_digree_2, mapped_digree_3) 
        AND '${ug_tier}' IN (tier_mapping_institute_0, tier_mapping_institute_1,tier_mapping_institute_2, tier_mapping_institute_3)
      
           ;
            `;
      } else {
        query = `
        SELECT *,
        (SELECT COUNT(*) FROM Linkedin_data
         WHERE (${conditions})
         AND '${ug_degree}' IN (mapped_digree_0, mapped_digree_1, mapped_digree_2, mapped_digree_3)
         AND '${ug_tier}' IN (tier_mapping_institute_0, tier_mapping_institute_1,tier_mapping_institute_2, tier_mapping_institute_3)) AS totalCount,
        (SELECT COUNT(*) FROM Linkedin_data
        WHERE (${conditions})) AS titleCount
        FROM Linkedin_data
        WHERE (${conditions})
        AND '${ug_degree}' IN (mapped_digree_0, mapped_digree_1, mapped_digree_2, mapped_digree_3) 
        AND '${ug_tier}' IN (tier_mapping_institute_0, tier_mapping_institute_1,tier_mapping_institute_2, tier_mapping_institute_3)
      
           ;
            `;
      }

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

  educationalOutput: async (educationalOutput) => {
    const connection = await pool.getConnection();
    const { ug_degree, ug_tier } = educationalOutput;
    try {
      let query = `
  SELECT *
  FROM Linkedin_data
  WHERE  '${ug_degree}' IN (mapped_digree_0, mapped_digree_1, mapped_digree_2, mapped_digree_3)
      AND '${ug_tier}' IN (tier_mapping_institute_0, tier_mapping_institute_1,tier_mapping_institute_2, tier_mapping_institute_3);
      `;

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

  getDesiredTitleCount: async (getDesiredTitleCount) => {
    const connection = await pool.getConnection();
    const { desired_title } = getDesiredTitleCount;

    try {
      let query = `
SELECT DISTINCT COUNT(*) AS count
FROM Linkedin_data
WHERE '${desired_title}' IN (mapped_title_0, mapped_title_1, mapped_title_2, mapped_title_3, mapped_title_4, mapped_title_5, mapped_title_6, mapped_title_7);
      `;

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
  getDesiredTitleOutput: async (getDesiredTitleOutput) => {
    const connection = await pool.getConnection();
    const { desired_title } = getDesiredTitleOutput;

    try {
      let query = `
SELECT * 
FROM Linkedin_data
WHERE '${desired_title}' IN (mapped_title_0, mapped_title_1, mapped_title_2, mapped_title_3, mapped_title_4, mapped_title_5, mapped_title_6, mapped_title_7);
      `;

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
  getColleges: async (getColleges) => {
    const connection = await pool.getConnection();

    try {
      let query = `
    SELECT DISTINCT
    mapped_institute_0 AS institute_value,
    mapped_digree_0 AS ug_degree
    FROM Linkedin_data
    UNION

    SELECT DISTINCT
    mapped_institute_1 AS institute_value,
    mapped_digree_1 AS ug_degree
    FROM Linkedin_data

    UNION

    SELECT DISTINCT
    mapped_institute_2 AS institute_value,
    mapped_digree_2 AS ug_degree
    FROM Linkedin_data

    UNION

    SELECT DISTINCT
    mapped_institute_3 AS institute_value,
    mapped_digree_3 AS ug_degree
    FROM Linkedin_data 
  
      `;

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

  // getOutputData: async (getOutputData) => {
  //   const connection = await pool.getConnection();
  //   const { desired_title, ug_degree, additional_degree } = getOutputData;
  //   try {
  //     let query = `
  //     SELECT *,
  //     (SELECT COUNT(*) FROM Linkedin_data
  //         WHERE '${desired_title}' IN (mapped_title_0, mapped_title_1, mapped_title_2, mapped_title_3, mapped_title_4, mapped_title_5, mapped_title_6, mapped_title_7)
  //         AND '${ug_degree}' IN (mapped_digree_0, mapped_digree_1, mapped_digree_2, mapped_digree_3)
  //         AND '${additional_degree}' IN (mapped_digree_0, mapped_digree_1, mapped_digree_2, mapped_digree_3)) AS totalCount,
  //     (SELECT COUNT(*) FROM Linkedin_data
  //         WHERE '${desired_title}' IN (mapped_title_0, mapped_title_1, mapped_title_2, mapped_title_3, mapped_title_4, mapped_title_5, mapped_title_6, mapped_title_7)) AS titleCount
  // FROM Linkedin_data
  // WHERE '${desired_title}' IN (mapped_title_0, mapped_title_1, mapped_title_2, mapped_title_3, mapped_title_4, mapped_title_5, mapped_title_6, mapped_title_7)
  //     AND '${ug_degree}' IN (mapped_digree_0, mapped_digree_1, mapped_digree_2, mapped_digree_3)
  //     AND '${additional_degree}' IN (mapped_digree_0, mapped_digree_1, mapped_digree_2, mapped_digree_3);
  //     `;

  //     const [rows] = await connection.query(query);
  //     return rows;
  //   } catch (err) {
  //     // Handle errors here
  //     console.error(err);
  //     throw err;
  //   } finally {
  //     connection.release(); // Release the connection back to the pool
  //   }
  // },
};

module.exports = LinkedinModel;
