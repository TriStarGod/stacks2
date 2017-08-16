// const bookshelf = require('../../server/bookshelf');

// module.exports = bookshelf.Model.extend({
//   tableName: 'users',
// });

import bookshelf from '../../server/bookshelf';

export default bookshelf.Model.extend({
  tableName: 'users',
});
