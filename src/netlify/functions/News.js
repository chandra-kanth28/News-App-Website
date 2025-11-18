export async function handler(event, context) {
    const category = event.queryStringParameters.category || "general";
  
    const API_URL = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`;
  
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
  
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
  
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to fetch news" }),
      };
    }
  }
  