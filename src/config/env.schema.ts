import Joi from "joi";

interface IENV_Schema {
  MONGO_INITDB_ROOT_PASSWORD: string;
  MONGO_INITDB_ROOT_USERNAME: string;
  STAGE: string;
}

export const ENV_SCHEMA = Joi.object<IENV_Schema>({
  MONGO_INITDB_ROOT_PASSWORD: Joi.string().required(),
  MONGO_INITDB_ROOT_USERNAME: Joi.string().required(),
  STAGE: Joi.string().valid("testing", "production").required(),
});
