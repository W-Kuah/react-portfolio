// const fetch = require('node-fetch');

exports.handler = async (event) => {

  const API_KEY = process.env.REACT_APP_CONTENTFUL_API_KEY;
  const SPACE_ID = process.env.REACT_APP_CONTENTFUL_SPACE_ID;
  const query = JSON.parse(event.body).queryKey;

try {
    const response = await fetch(`https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data" }),
    };
  }
};