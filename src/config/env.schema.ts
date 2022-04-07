import Joi from "joi";

interface IENV_Schema {
  MONGO_INITDB_ROOT_PASSWORD: string;
  MONGO_INITDB_ROOT_USERNAME: string;
  DB_HOST: string;
  DB_NAME: string;
  STAGE: string;
}

export const ENV_SCHEMA = Joi.object<IENV_Schema>({
  MONGO_INITDB_ROOT_PASSWORD: Joi.string().required(),
  MONGO_INITDB_ROOT_USERNAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  STAGE: Joi.string().valid("testing", "production").required(),
});
