/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('source_books').del()
  await knex('source_books').insert([
    {id: 1, name: 'CRB'},
    {id: 2, name: 'APG'},
    {id: 3, name: 'SoM'},
    {id: 4, name: 'LOGM'},
    {id: 5, name: 'LOGB'},
    {id: 6, name: 'TV'}
  ]);
};
