
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('email').notNullable().unique();
    table.string('username').notNullable().unique();
    table.string('firstName').notNullable().unique();
    table.string('lastName').notNullable().unique();
    table.string('role').notNullable().unique();
    table.string('passwordDigest').notNullable().unique();
    table.timestamps(); // creates createdat and updatedat fields
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
