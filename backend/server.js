const express = require("express");
const axios = require("axios");
const app = express();

const ETSY_API_ENDPOINT = "https://openapi.etsy.com/v2/listings/active";

const ETSY_API_KEY = "YOUR_ETSY_API_KEY";

app.get("/api/products", async (req, res) => {
  try {
    const response = await axios.get(ETSY_API_ENDPOINT, {
      params: {
        api_key: ETSY_API_KEY,
        keywords: req.query.keywords || "jewelry", // default query parameter
      },
    });

    res.json(response.data.results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products from Etsy API" });
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
