import knex from 'knex';
import pg from 'pg';
import * as types from 'pg-types';

// otherwise parses numeric type as string
pg.types.setTypeParser(types.builtins.NUMERIC, parseFloat);

const knexfile = require('../../../knexfile');

const env = process.env.NODE_ENV || 'development';
const configOptions = knexfile[env];

export default knex(configOptions);
