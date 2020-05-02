module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DB_URL || 'postgres://admin:admin@localhost:5432/converter',
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
    debug: true, // Enable Query Debugging
  },
  staging: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },
  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },
};
