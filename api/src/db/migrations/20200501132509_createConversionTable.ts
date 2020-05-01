import * as Knex from 'knex';

const PRECISION = 16;

export function up(knex: Knex): Promise<any> {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('conversion', (table) => {
      table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('baseCurrency', 3).notNullable();
      table.string('targetCurrency', 3).notNullable();
      table.decimal('amountInBase', PRECISION).notNullable();
      table.decimal('amountInTarget', PRECISION).notNullable();
      table.decimal('conversionRate', PRECISION).notNullable();
      table.decimal('amountInUsd', PRECISION).notNullable();
      table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    });
}

export function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('conversion').raw('DROP EXTENSION IF EXISTS "uuid-ossp"');
}
