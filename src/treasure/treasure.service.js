const knex = require("../db/connection");

function list(level_low, level_high) {
  return knex("items as i")
    .join("categories as c", "i.category_id", "c.id")
    .join("rarities as r", "r.id", "i.rarity_id")
    .join("source_books as sb", "sb.id", "i.source_book_id")
    .select("i.level", "i.name", "r.name as rarity", "c.name as category", "i.price_in_gold", "sb.name as source_book", "i.page_number", "i.is_consumable", "i.is_magical", "i.is_alchemical")
    .orderBy("i.name")
    .where("i.level", ">=", level_low)
    .where("i.level", "<=", level_high)
}

function list_perm_only(level_low, level_high) {
  return knex("items as i")
    .join("categories as c", "i.category_id", "c.id")
    .join("rarities as r", "r.id", "i.rarity_id")
    .join("source_books as sb", "sb.id", "i.source_book_id")
    .select("i.level", "i.name", "r.name as rarity", "c.name as category", "i.price_in_gold", "sb.name as source_book", "i.page_number", "i.is_consumable", "i.is_magical", "i.is_alchemical")
    .orderBy("i.name")
    .where("i.level", ">=", level_low)
    .where("i.level", "<=", level_high)
    .where("i.is_consumable", "=", "false")
}

function list_consume_only(level_low, level_high) {
  return knex("items as i")
    .join("categories as c", "i.category_id", "c.id")
    .join("rarities as r", "r.id", "i.rarity_id")
    .join("source_books as sb", "sb.id", "i.source_book_id")
    .select("i.level", "i.name", "r.name as rarity", "c.name as category", "i.price_in_gold", "sb.name as source_book", "i.page_number", "i.is_consumable", "i.is_magical", "i.is_alchemical")
    .orderBy("i.name")
    .where("i.level", ">=", level_low)
    .where("i.level", "<=", level_high)
    .where("i.is_consumable", "=", "true")
}

module.exports = {
  list,
  list_perm_only,
  list_consume_only
}