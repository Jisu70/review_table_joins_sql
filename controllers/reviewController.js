// Db connection
const { connection } = require("../utils/dbConnect");

//--------------------------------------------> Count function
const countFunction = (id) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `SELECT COUNT(*) AS review_count FROM reviews WHERE company_id = ${id}`;
      connection.query(query, function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results[0].review_count);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
//--------------------------------------------> Fetch Tag  function 
const fetchTagFunction = (id) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `SELECT * FROM review_tag_relation WHERE review_id = ${id} `;
      connection.query(query, function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

//----------------------------------------------> Fetch  reviews Function
const fetchReviewFunction = (id) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `SELECT * FROM reviews WHERE company_id = ${id}`;
      connection.query(query, function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

//-----------------------------------------> To Get the review of specific comapny_id
const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `SELECT * FROM reviews WHERE company_id = ${id}`;
    connection.query(query, async function (err, results) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      const tagPromises = results.map(async (result) => {
        try {
          const tagData = await fetchTagFunction(result.id);
          result.tags = tagData;
        } catch (error) {
          console.error("Error:", error);
          result.tags = [];
        }
      });
      await Promise.all(tagPromises);
      const count = await countFunction(id);
      res.status(200).json({ reviewCount: count, reviews: results });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


//-----------------------------------------> To Get the review for all company 
const getReview = async (req, res) => {
  try {
    const query = `SELECT reviews.company_id FROM reviews GROUP BY company_id;`;

    connection.query(query, async function (err, results) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      try {
        const promises = results.map(async (company) => {
          const review = await fetchReviewFunction(company.company_id); //------------------> Fetch reviews for each company
          const count = await countFunction(company.company_id); //---------------> Count all the reviews of specific company 

          // Fetch tags for each review item
          const updatedReview = await Promise.all(
            review.map(async (item) => {
              const tagData = await fetchTagFunction(item.id);
              item.tags = tagData;
              return item;
            })
          );

          company.reviewCount = count;
          company.reviews = updatedReview;
          return company;
        });

        const updatedResults = await Promise.all(promises);

        res.status(200).json({ Company: updatedResults });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getReview,
  getReviewById
};
