const uuid = require('uuid');
const { Column } = require('../tasks/task.model');

class Board {
  constructor ({
    id = uuid(),
    title = 'boardTitle',
    columns = [].push(new Column()), // replace
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
