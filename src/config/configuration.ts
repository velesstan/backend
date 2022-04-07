const configuration = () => {
  const DB_USER = process.env.MONGO_INITDB_ROOT_USERNAME;
  const DB_PASS = process.env.MONGO_INITDB_ROOT_PASSWORD;
  return {
    DB_CONNECTION: `mongodb://${DB_USER}:${DB_PASS}@localhost/core?authSource=admin`,
  };
};

export default configuration;
