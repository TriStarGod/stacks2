
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('email').notNullable().unique();
    table.string('username').notNullable().unique();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('role').notNullable();
    table.string('passwordDigest').notNullable();
    table.timestamps(); // creates createdat and updatedat fields
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
