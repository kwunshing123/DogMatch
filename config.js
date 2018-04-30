module.exports = {
  database: process.env.MONGO_URI || 'MONGO_URI' || 'localhost/nef',
  secret: "DogMatch",
  domain: "comp-5322.appspot.com"
};
