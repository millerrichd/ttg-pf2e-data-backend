/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('rarities').del()
  await knex('rarities').insert([
    {id: 1, name: 'common'},
    {id: 2, name: 'uncommon'},
    {id: 3, name: 'rare'},
    {id: 4, name: 'unique'}
  ]);
};
