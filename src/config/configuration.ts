const configuration = () => {
  const DB_USER = process.env.MONGO_INITDB_ROOT_USERNAME;
  const DB_PASS = process.env.MONGO_INITDB_ROOT_PASSWORD;
  const DB_HOST = process.env.DB_HOST;
  const DB_NAME = process.env.DB_NAME;
  return {
    DB_CONNECTION: `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?authSource=admin`,
  };
};

export default configuration;
