const uuid = require('uuid');
const { Column } = require('../tasks/task.model');

class Board {
  constructor ({
    id = uuid(),
    title = 'boardTitle',
    columns = [{
      id: uuid(),
      title: 'columnTitle',
      order: 0,
    }], // replace
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
