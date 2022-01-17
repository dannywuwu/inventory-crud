const prod = {
  env: "production",
  api_host: "https://inventory-crud-s22.herokuapp.com", // an empty string to signify a relative path. can also put a deployment URL.
};
const dev = {
  env: "development",
  api_host: "http://localhost:8080", // web server localhost port
};

console.log("process", process.env.NODE_ENV);

// export the appropriate environment
export default process.env.NODE_ENV === "production" ? prod : dev;
