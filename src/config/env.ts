export const envConfiguration = () => {
	return {
		DB_URL: process.env.DB_URL,
		ENVIRONMENT: process.env.NODE_ENV,
		PORT: process.env.PORT,
		EXPIRES_IN: process.env.EXPIRES_IN,
		HASH_SALT: process.env.HASH_SALT,
		JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
	};
};
