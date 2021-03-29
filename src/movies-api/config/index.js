require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 8080,
  cors: process.env.CORS,
  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  db_name: process.env.DB_NAME,
  db_user: process.env.DB_USER,
  db_pass: process.env.DB_PASS,
  db_protocol: process.env.DB_PROTOCOL,
  default_admin_password: process.env.DEFAULT_ADMIN_PASSWORD,
  default_user_password: process.env.DEFAULT_USER_PASSWORD,
  auth_jwt_secret: process.env.AUTH_JWT_SECRET,
  public_api_key_token: process.env.PUBLIC_API_KEY_TOKEN,
  admin_api_key_token: process.env.ADMIN_API_KEY_TOKEN,
};

module.exports = { config };
