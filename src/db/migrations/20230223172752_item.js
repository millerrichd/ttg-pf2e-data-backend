/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('items', function (t) {
    t.increments('id');
    t.bigint('category_id');
    t.bigint('source_book_id');
    t.bigint('rarity_id');
    t.string('name');
    t.bigint('level');
    t.bigint('price_in_gold');
    t.bigint('page_number');
    t.boolean('is_consumable');
    t.boolean('is_magical');
    t.boolean('is_alchemical');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('items');
};
