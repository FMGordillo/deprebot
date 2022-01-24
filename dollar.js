const axios = require("axios");

const endpoints = [
  "https://api-dolar-argentina.herokuapp.com",
  "https://api-dolar-argentina-2.herokuapp.com",
];

module.exports = async () => {
  try {
    const { data: blueData } = await axios.get(`${endpoints[0]}/api/dolarblue`);
    console.log({ data });
    return data;
  } catch {
    try {
      const { data } = await axios.get(`${endpoints[1]}/api/dolarblue`);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("NO DATA AVAILABLE");
    }
  }
};
