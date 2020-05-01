import knex from 'knex';

const knexfile = require('../knexfile');

const env = process.env.NODE_ENV || 'development';
const configOptions = knexfile[env];

export default knex(configOptions);
