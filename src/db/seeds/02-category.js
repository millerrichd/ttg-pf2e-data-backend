/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    {id: 1, name: 'Adjustment'},
    {id: 2, name: 'Ammunition'},
    {id: 3, name: 'Armor'},
    {id: 4, name: 'Artifact'},
    {id: 5, name: 'Assistive'},
    {id: 6, name: 'Bomb'},
    {id: 7, name: 'Cursed item'},
    {id: 8, name: 'Elixir'},
    {id: 9, name: 'Grimoire'},
    {id: 10, name: 'Held'},
    {id: 11, name: 'Intelligent item'},
    {id: 12, name: 'Missive'},
    {id: 13, name: 'Oil'},
    {id: 14, name: 'Other'},
    {id: 15, name: 'Poison'},
    {id: 16, name: 'Potion'},
    {id: 17, name: 'Rune'},
    {id: 18, name: 'Shield'},
    {id: 19, name: 'Spellheart'},
    {id: 20, name: 'Staff'},
    {id: 21, name: 'Talisman'},
    {id: 22, name: 'Tattoo'},
    {id: 23, name: 'Wand'},
    {id: 24, name: 'Weapon'},
    {id: 25, name: 'Worn'},
    {id: 26, name: 'Snare'},
    {id: 27, name: 'Scroll'},
    {id: 28, name: 'Tool'},
    {id: 29, name: 'Consumable'},
    {id: 30, name: 'Structure'},
    {id: 31, name: 'Companion'},
    {id: 32, name: 'Apex'},
    {id: 33, name: "Fulu"},
    {id: 34, name: "Eidolon"},
    {id: 35, name: "Catalyst"},
    {id: 36, name: "Gear"},
    {id: 37, name: "Vehicle"},
    {id: 38, name: "Gadget"},
    {id: 39, name: "Artifact"}
  ]);
};
