const joi = require('@hapi/joi');

const idSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const userSchema = {
  name: joi.string().max(100).required(),
  email:  joi.string().email().required(),
  password: joi.string().required().min(8),
}

const createUserSchema = {
  ...userSchema,
  isAdmin: joi.boolean()
}

const createProviderUserSchema = {
  ...userSchema,
  apiKeyToken: joi.string().required()
}

module.exports = {
  idSchema,
  createUserSchema,
  createProviderUserSchema
}